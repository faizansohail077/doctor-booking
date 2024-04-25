import { ReactNode } from "react"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { AlignJustify } from "lucide-react"
const AdminLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <Sheet>
                <SheetTrigger><AlignJustify color="black" /></SheetTrigger>
                <SheetContent side={"left"} className="bg-zinc-500">

                    <div className="flex items-center justify-center pb-2 mt-5">
                        {/* <img src="/logo.svg" alt="logo" className="h-8" /> */}
                        <span className="text-white text-lg ml-2">Doctor Management</span>
                    </div>
                </SheetContent>
            </Sheet>
            {children}

        </div>
    )
}

export default AdminLayout