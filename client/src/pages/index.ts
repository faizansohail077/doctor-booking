import { Admin } from "./admin";
import { Doctor } from "./doctor";
import { Patient } from "./patient";
import { Public } from "./public";

export const Pages = {
    AdminHome: Admin.AdminHome,
    AdminDoctors: Admin.AdminDoctors,
    AdminPatients: Admin.AdminPatients,
    DoctorRegister: Doctor.DoctorRegister,
    DoctorHome: Doctor.DoctorHome,
    PatientHome: Patient.PatientHome,
    PublicHome: Public.PublicHome,
    PageNotFound: Public.PageNotFound,
    Verify: Public.Verify,
    Login: Public.Login,
    ForgotPassword: Public.ForgotPassword,
    PatientRegister:Patient.PatientRegister
}