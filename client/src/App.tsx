import { HashRouter, Route, Routes } from "react-router-dom"
import { Pages } from "./pages"
import { Toaster } from "react-hot-toast"

function App() {
  return (
    <>
      <Toaster />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Pages.PublicHome />} />
          <Route path="/doctor/register" element={<Pages.DoctorRegister />} />
          <Route path="*" element={<Pages.PageNotFound />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
