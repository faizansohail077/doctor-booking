import { Router } from 'express'
import { registerDoctor } from '../../controller/doctor'

const router = Router()

router.get("/", (req, res) => {
    res.send("Welcome Doctor")
})

router.post("/create", registerDoctor)

export default router 
