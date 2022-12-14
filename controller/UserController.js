const Joi = require('joi');
const Student = require('../models/student');
const Datahelper = require('../DataHelper/datahelper');
const _Datahelper = new Datahelper();


const OTPgenerate = async () => {
    try {
        const otp = `${Math.floor(1000 + Math.random() * 9999)}`
        return otp
    } catch (error) {
        console.log(error)
    }
}

const login_method = async (req, res) => {
    try {
        const { email } = req.body
        
        const dataRequired = Joi.object({
            email: Joi.string().email().required(),
        });

        if (dataRequired.validate(req.body).error) {
            res.status(400).send(dataRequired.validate(req.body).error.details);
        } else {

            const userData = await Student.findOne({ where: { email: email } });
            if (userData) {
                let OtpGenerated = await OTPgenerate({})

                const userResult = {
                    otp: OtpGenerated
                }
                const updateData = await Student.update(userResult, {
                    where: {
                        id: userData.id
                    }
                })
                const response = {
                    success: true,
                    data: updateData
                }
                res.status(200).json({ success: true, msg: "login successfully", data: userResult })
                console.log(response)
            } else {
                res.status(400).json({ success: false, msg: "login credentials dont match" })
            }
        }
    } catch (error) {
        console.log(error)
    }
}

const verifyOTP = async (req, res) => {

    const { email, otp } = req.body
    const getStudentData = await Student.findOne({ where: { email: email, otp: otp } })

    if (getStudentData) {
        let tokenData = await _Datahelper.generateToken({
            user_id: getStudentData.id
        })
        const Result = {
            _id: getStudentData.id,
            token: tokenData
        }
        res.status(200).json({ success: true, msg: "login successfully", data: Result })
    } else {
        res.status(400).json({ success: false, msg: "login credentials dont match" })
    }
}

const getProfile = async (req, res) => {
    const getUser = await Student.findOne({
        where: {
            id: req.user.user_id
        }
    })
    if (getUser) {
        res.status(200).json({ success: true, msg: "profile details", data: getUser })
    } else {
        res.status(400).json({ success: false, msg: "user does not exist" })
    }
}

const updateProfile = async (req, res) => {
    const dataNeeded = Joi.object({
        name: Joi.string(),
        email: Joi.string(),
        address: Joi.string()
    })
    if (dataNeeded.validate(req.body).error) {
        res.status(400).send(dataNeeded.validate(req.body).error.details)
    } else {
        const updates = req.body

        const updatUser = await Student.update(updates, {
            where: {
                id: req.user.user_id
            }
        })
        if (updatUser) {
            res.status(200).json({ success: true, msg: "User details updated successfully", data: updates })
        } else {
            res.status(400).json({ success: false, msg: "can not update details" })
        }
    }
}

module.exports = { login_method, verifyOTP, getProfile, updateProfile }