import { HashRouter, Route, Routes } from "react-router-dom"
import { Pages } from "./pages"
import { Toaster } from "react-hot-toast"
import PrivateRoute from "./lib/PrivateRoute"
import { ROLE } from "./enums"

function App() {
  return (
    <>
      <Toaster />
      <HashRouter>
        <Routes>

          {/* public */}
          <Route path="/" element={<Pages.PublicHome />} />
          <Route path="/verify" element={<Pages.Verify />} />
          <Route path="/login" element={<Pages.Login />} />
          <Route path="/forgot-password" element={<Pages.ForgotPassword />} />
          <Route path="/find-doctors" element={<Pages.FindDoctors />} />

          {/* doctor */}
          <Route path="/doctor/register" element={<Pages.DoctorRegister />} />

          <Route path='/doctor/home' element={
            <PrivateRoute roles={[ROLE.DOCTOR]}>
              <Pages.DoctorHome />
            </PrivateRoute>

          } />
          <Route path='/doctor/profile' element={
            <PrivateRoute roles={[ROLE.DOCTOR]}>
              <Pages.DoctorProfile />
            </PrivateRoute>

          } />
          <Route path='/doctor/patients' element={
            <PrivateRoute roles={[ROLE.DOCTOR]}>
              <Pages.DoctorPatients />
            </PrivateRoute>

          } />

          {/* patient */}
          <Route path="/patient/register" element={<Pages.PatientRegister />} />
          <Route path='/patient/home' element={
            <PrivateRoute roles={[ROLE.PATIENT]}>
              <Pages.PatientHome />
            </PrivateRoute>
          } />
          {/* admin */}

          <Route path='/admin/home' element={
            <PrivateRoute roles={[ROLE.ADMIN]}>
              <Pages.AdminHome />
            </PrivateRoute>
          } />
          <Route path='/admin/doctors' element={
            <PrivateRoute roles={[ROLE.ADMIN]}>
              <Pages.AdminDoctors />
            </PrivateRoute>
          } />
          <Route path='/admin/patients' element={
            <PrivateRoute roles={[ROLE.ADMIN]}>
              <Pages.AdminPatients />
            </PrivateRoute>
          } />
          <Route path='/admin/doctors/:id' element={
            <PrivateRoute roles={[ROLE.ADMIN]}>
              <Pages.AdminDoctorDetail />
            </PrivateRoute>
          } />

          <Route path="*" element={<Pages.PageNotFound />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
