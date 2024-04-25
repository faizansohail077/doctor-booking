import { Request, Response } from "express"
import { DoctorModel } from "../../model/doctor"
import joi from 'joi'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const registerDoctor = async (req: Request, res: Response) => {

    const doctorValidation = joi.object({
        fullName: joi.string().required(),
        email: joi.string().required(),
        password: joi.string().required(),
        country: joi.string().required(),
        city: joi.string().required(),
        street: joi.string().required(),
        zip: joi.string().required(),
        lng: joi.number().required().min(1),
        lat: joi.number().required().min(1),
    });

    try {
        const saltRounds = 10;
        const { error, value } = doctorValidation.validate(req.body)
        if (error) {
            return res.send({ message: "Invalid Fields", error }).status(400)
        }
        // encrypting password
        const hashPassword = await bcrypt.hash(value?.password, saltRounds)
        value.password = hashPassword

        const doctor = await DoctorModel.CreateDoctor.create(value)
        const token = await jwt.sign({ user_id: doctor?._id, isApproved: doctor?.isApproved, isBlocked: doctor?.isBlocked, isProfileCompleted: doctor?.isProfileCompleted ,role:doctor.role}, process.env.JWT_SECRET!, { expiresIn: '1h' })

        res.send({ message: "Doctor Created", doctor,token })
    } catch (error: any) {
        console.log("Doctor Create", error)

        if (error.errorResponse?.code === 11000) {
            return res.status(400).send({ message: "Email Already Exists" })
        }
        res.status(501).send({ message: "Something Went Wrong" })
    }
}