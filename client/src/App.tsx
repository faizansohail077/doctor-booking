import { HashRouter, Route, Routes } from "react-router-dom"
import { Pages } from "./pages"

function App() {
  return (
   <>
  <HashRouter>
    <Routes>
      <Route path="/" element={<Pages.PublicHome />} />
    </Routes>
  </HashRouter>
   </>
  )
}

export default App
