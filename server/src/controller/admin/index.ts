import { Request, Response } from "express"
import { DoctorModel } from "../../model/doctor"

export const admin_getDoctorDetail = async (req: Request, res: Response) => {
    const { id } = req.params

    if (!id) return res.status(400).send({ message: "Doctor Id is Required" })

    try {
        const doctor = await DoctorModel.CreateDoctor.findById({ _id: id }).select("-password")
        res.send({ message: "Welcome Doctor", user: doctor })
    } catch (error: any) {
        console.log("Doctor Detail", error)
        res.status(501).send({ message: "Something Went Wrong" })
    }
}

export const admin_updateDoctorDetail = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const doctor = await DoctorModel.CreateDoctor.findById({ _id: id }).select("-password")
        if (!doctor) return res.status(404).send({ message: "Doctor Not found" })

        await DoctorModel.CreateDoctor.findByIdAndUpdate({ _id: id }, req.body, { new: true })

        res.send({ message: "Profile Updated" })

    } catch (error: any) {
        console.log("Doctor Detail", error)
        res.status(501).send({ message: "Something Went Wrong" })
    }
}