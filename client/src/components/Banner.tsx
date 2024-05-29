import { cn } from "@/lib/utils"

const Banner = ({ varient, text }: { varient: any, text: string }) => {
  console.log(varient,'varient')
  return (
    <div className={cn("h-12  text-white flex items-center justify-center",
      varient === "error" && "bg-red-400",
      varient === "success" && "bg-teal",
    )
    }>
      {text}
    </div>
  )
}

export default Banner