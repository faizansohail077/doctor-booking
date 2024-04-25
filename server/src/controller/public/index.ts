import { Request, Response } from "express"
import Joi from "joi"
import { DoctorModel } from "../../model/doctor"
import bcrypt from 'bcrypt'
import { sendToken } from "../../lib/helpers"

export const login = async (req: Request, res: Response) => {
    const loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })
    try {
        const { error, value } = loginSchema.validate(req.body)
        if (error) {
            return res.send({ message: "Invalid Fields", error }).status(400)
        }
        // const find user
        const user = await DoctorModel.CreateDoctor.findOne({ email: value?.email })

        if (!user) {
            return res.status(400).send({ message: "No User Found" })
        }
        // compare password
        const matchPassword = await bcrypt.compare(value?.password, user?.password)
        if (!matchPassword) return res.status(400).send({ message: "Invalid Credentials" })

        const token = await sendToken(user)

        res.send({ message: "login", token })

    } catch (error) {
        console.log("Login Error", error)
        res.status(500).send({ message: "Something Went Wrong" })
    }
}