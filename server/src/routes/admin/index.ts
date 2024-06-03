import { Router } from 'express'
import { admin_getDoctorDetail, admin_updateDoctorDetail } from '../../controller/admin'
const router = Router()

router.get("/", (req, res) => {
    res.send("Welcome admin")
})

router.get("/doctor-detail/:id", admin_getDoctorDetail)
router.patch("/doctor-update/:id", admin_updateDoctorDetail)

export default router 