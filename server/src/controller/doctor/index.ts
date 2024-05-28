import { Request, Response } from "express"
import { DoctorModel } from "../../model/doctor"
import joi from 'joi'
import bcrypt from 'bcrypt'
import { sendToken } from '../../lib/helpers'

export const registerDoctor = async (req: Request, res: Response) => {

    const doctorValidation = joi.object({
        fullName: joi.string().required(),
        email: joi.string().required(),
        password: joi.string().required(),
        country: joi.string().required(),
        city: joi.string().required(),
        street: joi.string().required(),
        zip: joi.string().required(),
        lng: joi.number().required(),
        lat: joi.number().required(),
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
        const token = await sendToken(doctor)

        res.send({ message: "Doctor Created", token })
    } catch (error: any) {
        console.log("Doctor Create", error)

        if (error.errorResponse?.code === 11000) {
            return res.status(400).send({ message: "Email Already Exists" })
        }
        res.status(501).send({ message: "Something Went Wrong" })
    }
}

export const getDoctorDetail = async (req: Request, res: Response) => {
    try {
        const doctor = await DoctorModel.CreateDoctor.findById((req as any).user?.user_id).select("-password")
        res.send({ message: "Welcome Doctor", user: doctor })
    } catch (error: any) {
        console.log("Doctor Detail", error)
        res.status(501).send({ message: "Something Went Wrong" })
    }
}

export const updateDoctorDetail = async (req: Request, res: Response) => {

    try {
        const doctor = await DoctorModel.CreateDoctor.findById((req as any).user?.user_id).select("-password")
        if (!doctor) return res.status(404).send({ message: "Doctor Not found" })
        const updatedDoctor = await DoctorModel.CreateDoctor.findByIdAndUpdate((req as any).user?.user_id, req.body, { new: true })
        res.send({ message: "Profile Updated", user: updatedDoctor })
    } catch (error: any) {
        console.log("Doctor Detail", error)
        res.status(501).send({ message: "Something Went Wrong" })
    }
}


