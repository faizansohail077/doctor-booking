import { Admin } from "./admin";
import { Doctor } from "./doctor";
import { Patient } from "./patient";
import { Public } from "./public";

export const Pages = {
    // admin
    AdminHome: Admin.AdminHome,
    AdminDoctors: Admin.AdminDoctors,
    AdminPatients: Admin.AdminPatients,
    AdminDoctorDetail: Admin.AdminDoctorDetail,
    // doctor
    DoctorProfile: Doctor.DoctorProfile,
    DoctorRegister: Doctor.DoctorRegister,
    DoctorHome: Doctor.DoctorHome,
    DoctorPatients: Doctor.DoctorPatients,
    // patient
    PatientHome: Patient.PatientHome,
    PublicHome: Public.PublicHome,
    PageNotFound: Public.PageNotFound,
    // public
    Verify: Public.Verify,
    Login: Public.Login,
    ForgotPassword: Public.ForgotPassword,
    PatientRegister: Patient.PatientRegister,
    FindDoctors: Public.FindDoctors,
}