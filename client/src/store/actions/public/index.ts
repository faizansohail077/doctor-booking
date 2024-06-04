import { LOGIN, SEARCH_DOCTOR } from "@/store/constants"
import { TLOCATION, TLOGIN } from "@/types"
import axios from "axios"

export const login = (body: TLOGIN) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { data } = await axios({
                method: "POST",
                url: LOGIN,
                data: body
            })
            localStorage.setItem("token", data?.token)
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

export const searchDoctorByLocation = (location: TLOCATION) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { data } = await axios({
                method: "POST",
                url: SEARCH_DOCTOR,
                data: location
            })
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}