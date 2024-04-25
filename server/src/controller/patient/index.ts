import { Request, Response } from "express"
import { PateintModel } from "../../model/patient"
import joi from 'joi'
import bcrypt from 'bcrypt'
import { sendToken } from '../../lib/helpers'


export const registerPatient = async (req: Request, res: Response) => {

    const patientValidation = joi.object({
        fullName: joi.string().required(),
        email: joi.string().required(),
        password: joi.string().required(),
        country: joi.string().required(),
        city: joi.string().required(),
    });

    try {
        const saltRounds = 10;
        const { error, value } = patientValidation.validate(req.body)
        if (error) {
            return res.send({ message: "Invalid Fields", error }).status(400)
        }
        // encrypting password
        const hashPassword = await bcrypt.hash(value?.password, saltRounds)
        value.password = hashPassword

        const patient = await PateintModel.RegisterPatient.create(value)
        const token = await sendToken(patient)

        res.send({ message: "Patient Created", token })
        
    } catch (error: any) {
        console.log("Patient Create", error)

        if (error.errorResponse?.code === 11000) {
            return res.status(400).send({ message: "Email Already Exists" })
        }
        res.status(501).send({ message: "Something Went Wrong" })
    }
}