import { useEffect, useState } from "react"
import { DoctorComponents } from "../components"
import { doctorAction } from "@/store/actions"
import { errorHandler } from "@/lib/helpers"
import toast from "react-hot-toast"
import { AddressForm } from "./components"


const DoctorProfile = () => {
  const [addressData, setAddressData] = useState<any>({})
  const [selectedTab, setSelectedTab] = useState("Address")

  useEffect(() => {
    getDoctorDetail()
  }, [])

  const getDoctorDetail = async () => {
    const id = toast.loading("Loading...")
    try {
      const data: any = await doctorAction.doctor_detail()
      setAddressData(data?.user)
      toast.dismiss(id)
    } catch (error) {
      return errorHandler(id, error)
    }
  }

  const tabs = ["Address", "Photo", "Certificates"]



  return (
    <DoctorComponents.DoctorLayout>
      <div className="h-full">
        <h1 className="text-xl font-bold" >Doctor Profile</h1>

        <div className="flex items-center gap-5 my-5">
          {tabs?.map((item, index) => {
            return (
              <p className={`pb-1 cursor-pointer ${selectedTab === item ? "border-b-2 border-primary text-primary" : "text-gray-500"}`} onClick={() => setSelectedTab(item)} key={index} >{item}</p>
            )
          })}
        </div>


        {/* address */}
        {selectedTab === "Address" && <AddressForm addressData={addressData} />}

        {/* email */}
        {/* photo */}
        {/* certificates */}
      </div>
    </DoctorComponents.DoctorLayout>
  )
}

export default DoctorProfile