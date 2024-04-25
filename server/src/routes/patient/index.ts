import { Router } from 'express'
import { registerPatient } from '../../controller/patient'

const router = Router()

router.get("/", (req, res) => {
    res.send("Welcome Patient")
})

router.post("/create", registerPatient)

export default router 
