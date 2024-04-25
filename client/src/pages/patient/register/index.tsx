import { Header } from "@/components"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import toast from "react-hot-toast"
import { patientAction } from "@/store/actions"

const formSchema = z.object({
    fullName: z.string().min(5, {
        message: "Full Name must be at least 5 characters.",
    }),
    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string().min(5,{
        message: "Password is required",
    }),
    country: z.string().min(2, {
        message: "Country is required.",
    }),
    city: z.string().min(2, {
        message: "city is required.",
    }),
})

const PatientRegister = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password:"",
            country: "",
            city: "",
        },
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const id = toast.loading("Submitting...")
        try {
            const result: any = await patientAction.register_patient(values)
            toast.dismiss(id)
            // navigate(`/verify`, {
            //     state: {
            //         email: result?.doctor?.email
            //     }
            // })
            toast.success(result?.message)
        } catch (error: any) {
            toast.dismiss(id)
            console.log(error, 'error')
            if (error?.response?.data?.message) {
                return toast.error(error?.response?.data?.message)
            } else {
                toast.error("Something Went Wrong")
            }
        }
    }
   

    return (
        <div>
            <Header />
            <div className="w-full md:max-w-7xl px-5 md:px-0 md:mx-auto mt-5 flex items-center justify-center">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full md:w-[80%] md:shadow-md md:p-5">
                      <h1 className="text-center font-bold text-xl">Patient Register</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Full Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>


                       
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            <FormField
                                control={form.control}
                                name="country"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Country</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Country" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>City</FormLabel>
                                        <FormControl>
                                            <Input placeholder="City" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                          
                        </div>
                        <Button type="submit">Submit</Button>
                    </form>

                </Form>

            </div>
        </div >
    )
}

export default PatientRegister