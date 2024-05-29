import { useEffect, useState } from "react"
import { AdminComponents } from "../components"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { errorHandler } from "@/lib/helpers"
import { doctorAction } from "@/store/actions"
import Loader from "@/components/loader"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router-dom"

const AdminDoctors = () => {
  const [loader, setLoader] = useState(false)
  const [doctors, setDoctors] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    getallDoctors()
  }, [])


  const getallDoctors = async () => {
    try {
      setLoader(true)
      const data: any = await doctorAction.get_all_doctor()
      console.log(data, 'data')
      setDoctors(data?.user)
    } catch (error) {
      errorHandler(error)
    } finally {
      setLoader(false)

    }
  }

  const blockDoctor = async (id: string, value: boolean) => {
    console.log(id, value)
    const result = confirm("Are you sure you want to block this doctor?")
    if (result) {

    }
  }

  return (
    <AdminComponents.AdminLayout>

      <h1 className="text-xl font-bold text-deepTeal" >Doctors</h1>
      {loader ? <>
        <Loader />
      </> :
        !doctors?.length ? <div>No doctors found</div> : <>

          <Table >
            <TableHeader>
              <TableRow>
                <TableHead >Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Is Profile Completed</TableHead>
                <TableHead >Approved</TableHead>
                <TableHead className="text-right">Blocked</TableHead>
              </TableRow>
            </TableHeader>
            {doctors?.map((item: any, index) => {
              return (<TableBody key={index} onClick={() => navigate(`/admin/doctors/${item?._id}`)} >
                <TableRow className="cursor-pointer" >
                  <TableCell className="font-medium">{item?.fullName}</TableCell>
                  <TableCell>{item?.email}</TableCell>
                  <TableCell>{
                    <Badge variant={`${item?.isProfileCompleted ? "success" : "destructive"}`}>{item?.isProfileCompleted ? "Yes" : "No"}</Badge>
                  }</TableCell>

                  <TableCell>{
                    <Badge variant={`${item?.isApproved ? "success" : "destructive"}`}>{item?.isApproved ? "Yes" : "No"}</Badge>
                  }</TableCell>

                  <TableCell className="text-right">{
                    <Switch onCheckedChange={(e) => blockDoctor(item?._id, e)} />

                  }</TableCell>
                </TableRow>
              </TableBody>
              )
            })}
          </Table>

        </>

      }
    </AdminComponents.AdminLayout>
  )
}

export default AdminDoctors