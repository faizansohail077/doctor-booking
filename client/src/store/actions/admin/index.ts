import { getToken } from "@/lib/helpers"
import { ADMIN_DOCOTR_DETAIL, ADMIN_UPDATE_DOCTOR_DETAIL } from "@/store/constants"
import axios from "axios"

export const doctor_detail = (id: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { data } = await axios({
                method: "GET",
                url: `${ADMIN_DOCOTR_DETAIL}/${id}`,
                headers: {
                    "content-type": "application/json",
                    "Authorization": getToken(),
                }
            })
            resolve(data)

        } catch (error) {
            reject(error)
        }
    })
}

export const update_doctor_details = (id: string, body: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { data } = await axios({
                method: "PATCH",
                url: `${ADMIN_UPDATE_DOCTOR_DETAIL}/${id}`,
                data: body,
                headers: {
                    "Authorization": getToken()
                }
            })
            console.log(data, 'data')
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}