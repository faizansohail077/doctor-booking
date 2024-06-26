"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import toast from "react-hot-toast"
import { Header } from "@/components"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react"

const FormSchema = z.object({
    pin: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
})

function Verify() {
    const { state } = useLocation()
    const navigate = useNavigate()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pin: "",
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        // <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        toast.success("You have successfully verified your account.")
        console.log(data, 'data')
    }
    useEffect(() => {
        if (!state) {
            navigate('/')
        }
    }, [])


    return (
        <>
            <Header />
            <div className="max-w-7xl  md:mx-auto flex items-center justify-center md:h-[70vh]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="p-5 mt-10 shadow-md md:p-2 rounded-md space-y-6">
                        <FormField
                            control={form.control}
                            name="pin"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>One-Time Password</FormLabel>
                                    <FormControl>
                                        <InputOTP maxLength={6} {...field}>
                                            <InputOTPGroup>
                                                <InputOTPSlot index={0} />
                                                <InputOTPSlot index={1} />
                                                <InputOTPSlot index={2} />
                                                <InputOTPSlot index={3} />
                                                <InputOTPSlot index={4} />
                                                <InputOTPSlot index={5} />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormDescription>
                                        Please enter the one-time password sent to your email <span className="text-gray-600 text-xs" >({state?.email})</span>.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
        </>
    )
}
export default Verify