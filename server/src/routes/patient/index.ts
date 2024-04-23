import { Router } from 'express'

const router = Router()

router.get("/patient", (req, res) => {
    res.send("Welcome patient")
})

export default router 