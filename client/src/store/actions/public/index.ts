import { LOGIN } from "@/store/constants"
import axios from "axios"

export const login = (body: LOGIN) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { data } = await axios({
                method: "POST",
                url: LOGIN,
                data: body
            })
            localStorage.setItem("token",data?.token)
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}