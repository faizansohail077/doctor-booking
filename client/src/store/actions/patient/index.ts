import { REGISTER_PATIENT } from '@/store/constants'
import { TREGISTER_PATIENT } from '@/types'
import axios from 'axios'

export const register_patient = (body: TREGISTER_PATIENT) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { data } = await axios({
                method: "POST",
                url: REGISTER_PATIENT,
                data: body
            })

            localStorage.setItem("token",data?.token)

            resolve(data)

        } catch (error) {
            reject(error)
        }
    })
}