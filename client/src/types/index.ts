type REGISTER_DOCTOR = {
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
type REGISTER_PATIENT = {
    fullName: string,
    email: string,
    password: string,
    country: string,
    city: string,
}
type LOGIN = {
    email: string,
    password: string,
}