const BASE_URL = `${import.meta.env.VITE_BASE_URL!}/api`
// doctor
export const REGISTER_DOCTOR = `${BASE_URL}/doctor/create`
export const DOCTOR_DETAIL = `${BASE_URL}/doctor/me`
export const UPDATE_DOCTOR_DETAIL = `${BASE_URL}/doctor/me`

// patient
export const REGISTER_PATIENT = `${BASE_URL}/patient/create`

// public
export const LOGIN = `${BASE_URL}/public/login`
