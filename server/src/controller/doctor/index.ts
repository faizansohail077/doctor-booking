import { Request, Response } from "express"
import { DoctorModel } from "../../model/doctor"
import joi from 'joi'
export const registerDoctor = async (req: Request, res: Response) => {

    const doctorValidation = joi.object({
        fullName: joi.string().required(),
        email: joi.string().required(),
        country: joi.string().required(),
        city: joi.string().required(),
        street: joi.string().required(),
        zip: joi.string().required(),
        lng: joi.number().required().min(1),
        lat: joi.number().required().min(1),
    });

    try {
        const { error, value } = doctorValidation.validate(req.body)
        if (error) {
            return res.send({ message: "Invalid Fields", error }).status(400)
        }
        const doctor = await DoctorModel.CreateDoctor.create(value)
        res.send({ message: "Doctor Created", doctor })
    } catch (error: any) {
        console.log(error, 'error')
        if (error.errorResponse?.code === 11000) {
            return res.send({ message: "Email Already Exists" }).status(400)
        }
        res.send({ message: "Something Went Wrong" }).status(501)
    }
}