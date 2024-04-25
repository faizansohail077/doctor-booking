import { REGISTER_PATIENT } from '@/store/constants'
import axios from 'axios'

export const register_patient = (body: REGISTER_PATIENT) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { data } = await axios({
                method: "POST",
                url: REGISTER_PATIENT,
                data: body
            })

            resolve(data)

        } catch (error) {
            reject(error)
        }
    })
}