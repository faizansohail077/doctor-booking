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
          <Route path="/admin/register" element={<Pages.AdminRegister />} />
          <Route path="*" element={<Pages.PageNotFound />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
