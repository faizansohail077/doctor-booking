import { Router } from 'express'
import { getDoctorDetail, registerDoctor } from '../../controller/doctor'
import { authMiddleware } from '../../middleware'

const router = Router()

router.get("/", (req, res) => {
    res.send("Welcome Doctor")
})
router.get("/me", authMiddleware, getDoctorDetail)

router.post("/create", registerDoctor)

export default router 
