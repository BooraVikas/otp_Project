const Joi = require('joi');
const Student = require('../models/student');

const Datahelper = require('../DataHelper/datahelper')
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

        const response = {
            success: true,
            data: Result
        }
        res.status(200).json({ success: true, msg: "login successfully", data: Result })
        console.log(response)

    } else {
        res.status(400).json({ success: false, msg: "login credentials dont match" })
    }
}


const getProfile = async (req, res) => {
    const getUser = await Student.findOne({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({ success: true, msg: "profile details", data: getUser })
}


const updateProfile = async(req,res)=>{
    const updates = req.body
    const updatUser = await Student.update(updates, {
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({ data: updatUser })
}


module.exports = { login_method, verifyOTP, getProfile , updateProfile}