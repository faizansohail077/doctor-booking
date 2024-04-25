import { HashRouter, Route, Routes } from "react-router-dom"
import { Pages } from "./pages"
import { Toaster } from "react-hot-toast"

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
         
          {/* doctor */}
          <Route path="/doctor/register" element={<Pages.DoctorRegister />} />

          {/* patient */}
          <Route path="/patient/register" element={<Pages.PatientRegister />} />

          <Route path="*" element={<Pages.PageNotFound />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
