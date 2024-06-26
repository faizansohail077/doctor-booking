import { getToken } from '@/lib/helpers'
import { DOCTOR_DETAIL, GET_ALL_DOCTOR, REGISTER_DOCTOR, UPDATE_DOCTOR_DETAIL } from '@/store/constants'
import { TREGISTER_DOCTOR } from '@/types'
import axios from 'axios'

export const register_doctor = (body: TREGISTER_DOCTOR) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { data } = await axios({
                method: "POST",
                url: REGISTER_DOCTOR,
                data: body
            })
            localStorage.setItem("token", data?.token)
            resolve(data)

        } catch (error) {
            reject(error)
        }
    })
}

export const doctor_detail = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const { data } = await axios({
                method: "GET",
                url: DOCTOR_DETAIL,
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


export const update_doctor_details = (body: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { data } = await axios({
                method: "PATCH",
                url: UPDATE_DOCTOR_DETAIL,
                data: body,
                headers: {
                    "Authorization": getToken()
                }
            })
            localStorage.setItem("token",data?.token)
            console.log(data,'data')
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

export const get_all_doctor = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const { data } = await axios({
                method: "GET",
                url: GET_ALL_DOCTOR,
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

