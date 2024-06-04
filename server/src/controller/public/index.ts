import { Request, Response } from "express"
import Joi from "joi"
import { DoctorModel } from "../../model/doctor"
import bcrypt from 'bcrypt'
import { sendToken } from "../../lib/helpers"
import { PateintModel } from "../../model/patient"

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
        const doctor = await DoctorModel.CreateDoctor.findOne({ email: value?.email })
        const patient = await PateintModel.RegisterPatient.findOne({ email: value?.email })

        if (!doctor && !patient) {
            return res.status(400).send({ message: "No User Found" })
        }
        // compare password
        let user = doctor || patient
        const matchPassword = await bcrypt.compare(value?.password, user?.password)
        if (!matchPassword) return res.status(400).send({ message: "Invalid Credentials" })

        const token = await sendToken(user)

        res.send({ message: `Welcome ${user?.role?.toLowerCase()} ${user?.fullName}`, token })

    } catch (error) {
        console.log("Login Error", error)
        res.status(500).send({ message: "Something Went Wrong" })
    }
}

export const searchDoctorByLocation = async (req: Request, res: Response) => {
    try {
        const { lat, lng ,distance} = req.body
        console.log(lat, lng, 'lat, lng')
        console.log(distance,'distance')
        if (!lat || !lng) {
            return res.status(400).send({ message: "Invalid Fields" })
        }
       
        const doctors = await DoctorModel.CreateDoctor.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [lng, lat]
                    },
                    $maxDistance: distance * 1000
                }
            }
        }).where('isApproved').equals(true).where('isBlocked').equals(false).where('isProfileCompleted').equals(true)

        if(doctors.length === 0) return res.status(400).send({ message: "No Doctor Found Near You" })

        console.log(doctors, 'doctors')

        res.send({ message: `Found Doctors`, doctors })


    } catch (error) {
        console.log("searchDoctorByLocation Error", error)
        res.status(500).send({ message: "Something Went Wrong" })
    }
}