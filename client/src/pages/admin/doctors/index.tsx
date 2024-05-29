import { useEffect, useState } from "react"
import { AdminComponents } from "../components"

import {
  Table,
  TableBody,
  TableCaption,
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

const AdminDoctors = () => {
  const [loader, setLoader] = useState(false)
  const [doctors, setDoctors] = useState([])

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
  return (
    <AdminComponents.AdminLayout>

      <h1 className="text-xl font-bold text-deepTeal" >Doctors</h1>
      {loader ? <>
        <Loader />
      </> :
        !doctors?.length ? <div>No doctors found</div> : <>
          {doctors?.map((item: any, index) => {
            return (
              <Table key={index}>
                <TableCaption>A list of Doctors.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Is Profile Completed</TableHead>
                    <TableHead >Approved</TableHead>
                    <TableHead className="text-right">Blocked</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">{item?.fullName}</TableCell>
                    <TableCell>{item?.email}</TableCell>
                    <TableCell>{
                      <Badge variant={`${item?.isProfileCompleted ? "success" : "destructive"}`}>{item?.isProfileCompleted ? "Yes" : "No"}</Badge>
                    }</TableCell>
                    
                    <TableCell>{
                      <Badge variant={`${item?.isApproved ? "success" : "destructive"}`}>{item?.isApproved ? "Yes" : "No"}</Badge>
                    }</TableCell>

                    <TableCell className="text-right">{
                      <Switch  onCheckedChange={(e)=>console.log(e,'e')} />

                    }</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            )
          })}
        </>

      }
    </AdminComponents.AdminLayout>
  )
}

export default AdminDoctors