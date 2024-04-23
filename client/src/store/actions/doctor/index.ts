import { REGISTER_DOCTOR } from '@/store/constants'
import axios from 'axios'

export const register_doctor = (body: REGISTER_DOCTOR) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {data} = await axios({
                method: "POST",
                url: REGISTER_DOCTOR,
                data: body
            })
            
            resolve(data)

        } catch (error) {
            reject(error)
        }
    })
}