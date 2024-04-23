import { Admin } from "./admin";
import { Doctor } from "./doctor";
import { Patient } from "./patient";
import { Public } from "./public";

export const Pages = {
    AdminHome: Admin.AdminHome,
    DoctorHome: Doctor.DoctorHome,
    PatientHome: Patient.PatientHome,
    PublicHome: Public.PublicHome
}