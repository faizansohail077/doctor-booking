import { useNavigate, useParams } from "react-router-dom"
import { AdminComponents } from "../components"
import { useEffect, useState } from "react"
import { errorHandler } from "@/lib/helpers"
import { adminAction } from "@/store/actions"
import Loader from "@/components/loader"
import { AddressForm, Certificates, Photo } from "./components"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import toast from "react-hot-toast"

interface DoctorData {
    certificates: string[]
    city: string
    country: string
    createdAt: string
    email: string
    fullName: string
    isApproved: boolean
    isBlocked: boolean
    isProfileCompleted: boolean
    lat: number
    lng: number
    role: string
    street: string
    updatedAt: string
    zip: string
    __v: number
    _id: string
}

interface IData {
    message: string
    user: DoctorData
}


const AdminDoctorDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [loader, setLoader] = useState(false)
    console.log(id, 'id')

    const [data, setData] = useState<DoctorData | null>(null)
    const [selectedTab, setSelectedTab] = useState("Address")


    useEffect(() => {
        if (!id) return navigate('/admin/doctors')
        getDoctorDetail()
    }, [id])

    const getDoctorDetail = async () => {
        try {
            setLoader(true)
            const response = await adminAction.doctor_detail(id!) as IData
            setData(response?.user)
        } catch (error) {
            errorHandler(error)
        } finally {
            setLoader(false)
        }
    }

    const tabs = ["Address", "Photo", "Certificates"]

    const approveDoctor = async () => {
        try {
            setLoader(true)
            const response = await adminAction.update_doctor_details(id!, { isApproved: true }) as IData
            setData(response?.user)
            toast.success("Doctor Approved")
            navigate('/admin/doctors')
        } catch (error) {
            errorHandler(error)
        } finally {
            setLoader(false)
        }
    }

    return (
        <AdminComponents.AdminLayout>
            {loader ? <><Loader /></> : <>
                <h1 className="text-xl font-bold" >  Doctor Detail</h1>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5 my-5">
                        <>
                            {tabs?.map((item, index) => {
                                return (
                                    <p className={`pb-1 cursor-pointer ${selectedTab === item ? "border-b-2 border-primary text-primary" : "text-gray-500"}`} onClick={() => setSelectedTab(item)} key={index} >{item}</p>
                                )
                            })}
                        </>

                    </div>
                    <>
                        {data?.isApproved ? <>
                            <Badge variant="success">Approved</Badge>

                        </> :

                            <Button onClick={() => approveDoctor()} >Approve</Button>
                        }
                    </>
                </div>

                {selectedTab === "Address" && <AddressForm addressData={data} />}

                {/* photo */}
                {selectedTab === "Photo" && <Photo addressData={data} />}

                {/* certificates */}
                {selectedTab === "Certificates" && <Certificates addressData={data} />}
            </>}
        </AdminComponents.AdminLayout>
    )
}

export default AdminDoctorDetail