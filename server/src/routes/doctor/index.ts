import { Router } from 'express'
import { getDoctorDetail, registerDoctor, updateDoctorDetail } from '../../controller/doctor'
import { authMiddleware } from '../../middleware'

const router = Router()

router.get("/", (req, res) => {
    res.send("Welcome Doctor")
})
router.get("/me", authMiddleware, getDoctorDetail)
router.patch("/me", authMiddleware, updateDoctorDetail)

router.post("/create", registerDoctor)

export default router 
