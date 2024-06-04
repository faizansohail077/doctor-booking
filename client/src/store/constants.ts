const BASE_URL = `${import.meta.env.VITE_BASE_URL!}/api`
// doctor
export const REGISTER_DOCTOR = `${BASE_URL}/doctor/create`
export const DOCTOR_DETAIL = `${BASE_URL}/doctor/me`
export const GET_ALL_DOCTOR = `${BASE_URL}/doctor/get-all`
export const UPDATE_DOCTOR_DETAIL = `${BASE_URL}/doctor/me`

// patient
export const REGISTER_PATIENT = `${BASE_URL}/patient/create`

// admin
export const ADMIN_DOCOTR_DETAIL = `${BASE_URL}/admin/doctor-detail`
export const ADMIN_UPDATE_DOCTOR_DETAIL = `${BASE_URL}/admin/doctor-update`


// public
export const LOGIN = `${BASE_URL}/public/login`
export const SEARCH_DOCTOR = `${BASE_URL}/public/doctor-search`
