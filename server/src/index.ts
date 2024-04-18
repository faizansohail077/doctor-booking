import express,{ Request,Express ,Response} from "express"
import dotenv from "dotenv"

dotenv.config()

const app: Express = express()

app.use(express.json())

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!")
})
app.listen(3000, () => {
    console.log("Server is running on port 3000")
})