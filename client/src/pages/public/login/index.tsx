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
import { publicAction } from "@/store/actions"
import { useNavigate } from "react-router-dom"
import { getUser } from "@/lib/helpers"
import { ROLE } from "@/enums"


const formSchema = z.object({

    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string().min(2, {
        message: "Password is required.",
    }),

})

const Login = () => {
    const navigate = useNavigate()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema.required()),
        defaultValues: {
            email: "",
            password: "",

        },
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {


        const id = toast.loading("Submitting...")
        try {
            const result: any = await publicAction.login(values)
            toast.dismiss(id)
            const user = getUser()

            if (user?.role === ROLE["ADMIN"]) {
                navigate('/admin/home')
            }
            if (user?.role === ROLE["PATIENT"]) {
                navigate('/patient/home')
            }
            if (user?.role === ROLE["DOCTOR"]) {
                navigate('/doctor/home')
            }
            if (user?.role === ROLE["PATIENT"]) {
                navigate('/patient/home')
            }
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
                    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 space-y-8 w-full md:w-1/2 md:shadow-md md:p-3">
                        <h1 className="text-xl font-bold text-center" >Login</h1>

                        <div className="grid grid-cols-1 gap-5">

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
                        <div className="flex items-center justify-between flex-wrap gap-5">
                            <p onClick={() => navigate('/forgot-password')} className="text-sm text-blue-500 cursor-pointer">Forgot Password ?</p>
                            <p onClick={() => navigate('/patient/register')} className="text-sm text-blue-500 cursor-pointer">Don't Have Account ?</p>
                        </div>
                        <Button type="submit">Submit</Button>
                    </form>

                </Form>

            </div>
        </div >
    )
}

export default Login