import express, { Express } from "express"
import dotenv from "dotenv"
import { Router } from "./routes"
import mongoose from "mongoose"
import cors from 'cors'

dotenv.config()
const PORT = process.env.PORT || 3000
const CONNECTION_URL = process.env.CONNECTION_URL || "mongodb://localhost:27017"

const app: Express = express()
app.use(express.json())
app.use(cors())

app.use('/api/admin', Router.AdminRouter)
app.use('/api/doctor', Router.DoctorRouter)
app.use('/api/patient', Router.PatientRouter)

app.use("*",(_,res)=>{
    res.send("404 API Not Found")
})

mongoose.connect("mongodb://localhost:27017")
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));