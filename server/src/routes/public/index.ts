import { Router } from 'express'
import { login } from '../../controller/public'

const router = Router()

router.get("/", (req, res) => {
    res.send("Welcome Public")
})

router.post("/login", login)

export default router 
