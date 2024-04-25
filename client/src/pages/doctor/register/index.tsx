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

import PlacesAutocomplete from 'react-places-autocomplete';
import {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import { useState } from "react"

import {
    setKey,
    fromLatLng,
} from "react-geocode";
import toast from "react-hot-toast"
import { doctorAction } from "@/store/actions"

setKey(import.meta.env.VITE_GOOGLE_PLACES_API_KEY!);

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
    street: z.string().min(2, {
        message: "Street is required.",
    }),
    zip: z.string().min(2, {
        message: "Postal is required.",
    }),
    lng: z.number().optional(),
    lat: z.number().optional(),
})

const DoctorRegister = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password:"",
            country: "",
            city: "",
            street: "",
            zip: "",
            lng: 0,
            lat: 0
        },
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (values.lat === 0 || values.lng === 0) {
            return toast.error("Select Location From Search Bar")
        }

        const id = toast.loading("Submitting...")
        try {
            const result: any = await doctorAction.register_doctor(values)
            toast.dismiss(id)
            // navigate(`/verify`, {
            //     state: {
            //         email: result?.doctor?.email
            //     }
            // })
            console.log(result,'result')
            toast.success("Form submitted successfully")
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
    const [address, setAddress] = useState("")

    const handleSelect = (address: string) => {
        geocodeByAddress(address)
            .then((results) => {
                return getLatLng(results[0])
            })
            .then(latLng => {
                fromLatLng(latLng?.lat, latLng?.lng)
                    .then(
                        (response) => {
                            const places = response?.results[0];
                            const postalCode = places.address_components.find((c: any) => c?.types?.includes('postal_code'));
                            const search_street = places?.formatted_address
                            let splitStreet = search_street?.split(",")[0] + search_street?.split(",")[1]

                            const get_city = places.address_components.find((c: any) => c.types.includes("locality")) || places.address_components.find((c: any) => c.types.includes("postal_town"));
                            const get_country = places.address_components.find((c: any) => c.types.includes("country"));
                            form.setValue("lat", latLng?.lat)
                            form.setValue("lng", latLng?.lng)
                            form.setValue("street", splitStreet)
                            form.setValue("city", get_city?.long_name)
                            form.setValue("country", get_country?.long_name)
                            form.setValue("zip", postalCode?.long_name || "")
                        })
                    .catch(console.error);
            })
            .catch(error => console.error('Error', error));
    };

    return (
        <div>
            <Header />
            <div className="w-full md:max-w-7xl px-5 md:px-0 md:mx-auto mt-5 flex items-center justify-center">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
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


                        <div className="grid grid-cols-1 gap-5">

                            <PlacesAutocomplete
                                onChange={(e) => setAddress(e)}
                                onSelect={handleSelect}
                                value={address}
                            >
                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                    <div>
                                        <FormLabel>Search Address</FormLabel>
                                        <input
                                            {...getInputProps({
                                                placeholder: 'Search Places ...',
                                                className: 'mt-2 location-search-input w-full flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                                            })}
                                        />
                                        <div className="autocomplete-dropdown-container">
                                            {loading && <div>Loading...</div>}
                                            {suggestions?.map((suggestion, index) => {
                                                const className = suggestion.active
                                                    ? 'suggestion-item--active mt-3'
                                                    : 'suggestion-item mt-3';
                                                // inline style for demonstration purpose
                                                const style = suggestion.active
                                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                return (
                                                    <div
                                                        {...getSuggestionItemProps(suggestion, {
                                                            className,
                                                            key: index,
                                                            style,
                                                        })}
                                                    >
                                                        <span>{suggestion.description}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </PlacesAutocomplete>
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
                                name="street"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Street</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Street" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="zip"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Postal Code</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Postal Code" {...field} />
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

export default DoctorRegister