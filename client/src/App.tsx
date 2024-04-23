import { HashRouter, Route, Routes } from "react-router-dom"
import { Pages } from "./pages"

function App() {
  return (
    <>
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
