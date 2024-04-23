import { Link, useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { AlignJustify } from "lucide-react"
import { ModeToggle } from "./mode-toggle"
const Header = () => {
  const navigate = useNavigate()
  return (
    <div className="bg-deepTeal h-14" >
      <div className="max-w-7xl  mx-auto h-full">
        <div className="flex items-center justify-between h-full w-full">
          <div className="flex items-center pb-2">
            {/* <img src="/logo.svg" alt="logo" className="h-8" /> */}
            <span className="text-white text-lg ml-2">Doctor Management</span>
          </div>
          <div className="hidden sm:flex  items-center gap-5 pb-2">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/" className="nav-link">About</Link>
            <Link to="/" className="nav-link">Contact Us</Link>
            <div className="flex items-center gap-2">

              <Button size={"sm"} variant={"outline"}  >Login</Button>
              <Button onClick={() => navigate("/admin/register")} size={"sm"}  >Apply As Doctor</Button>

            </div>
            <ModeToggle />
          </div>
          <div className="inline sm:hidden mr-2">

            <MobileHeader />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header

const MobileHeader = () => {
  const navigate = useNavigate()

  return (
    <Sheet>
      <SheetTrigger><AlignJustify color="white" /></SheetTrigger>
      <SheetContent side={"right"} className="bg-zinc-500">

        <div className="flex items-center justify-center pb-2 mt-5">
          {/* <img src="/logo.svg" alt="logo" className="h-8" /> */}
          <span className="text-white text-lg ml-2">Doctor Management</span>
        </div>
        <div className="flex flex-col items-center gap-5 pb-2">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/" className="nav-link">About</Link>
          <Link to="/" className="nav-link">Contact Us</Link>
          <Button size={"sm"} variant={"outline"}  >Login</Button>
          <Button onClick={() => navigate("/admin/register")} size={"sm"}  >Apply As Doctor</Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}