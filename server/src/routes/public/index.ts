import { Router } from 'express'
import { login, searchDoctorByLocation } from '../../controller/public'

const router = Router()

router.get("/", (req, res) => {
    res.send("Welcome Public")
})

router.post("/login", login)
router.post("/doctor-search", searchDoctorByLocation)

export default router 
