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
import {  publicAction } from "@/store/actions"


const formSchema = z.object({

    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string().min(2, {
        message: "Password is required.",
    }),

})

const Login = () => {

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
            console.log(result)
            toast.success("Welcome to the platform")
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
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

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
                        <Button type="submit">Submit</Button>
                    </form>

                </Form>

            </div>
        </div >
    )
}

export default Login