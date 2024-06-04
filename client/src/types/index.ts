export type TREGISTER_DOCTOR = {
    fullName: string,
    email: string,
    password: string,
    country: string,
    city: string,
    street: string,
    zip: string,
    lng?: number,
    lat?: number,
}
export type TREGISTER_PATIENT = {
    fullName: string,
    email: string,
    password: string,
    country: string,
    city: string,
}
export type TLOGIN = {
    email: string,
    password: string,
}
export type TLOCATION = {
    lng: number | null,
    lat: number | null
}