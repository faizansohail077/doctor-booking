import { Header } from "@/components"
import Loader from "@/components/loader";
import { useLocation } from "@/hooks";
import { errorHandler } from "@/lib/helpers";
import { publicAction } from "@/store/actions";
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DoctorCard from "./DoctorCard";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const containerStyle = {
    width: '100%',
    height: '95vh'
};

const FindDoctors = () => {

    const { location, error } = useLocation();
    const [loader, setLoader] = useState(false)
    const [doctors, setDoctors] = useState([])
    const [selectedDoctor, setSelectedDoctor] = useState(null)
    console.log(location, 'location')
    console.log(selectedDoctor, 'selectedDoctor')

    const center = React.useMemo(() => ({
        lat: location?.lat ? location.lat : -3.745,
        lng: location?.lng ? location.lng : -38.523
    }), [location]);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map: any) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds();
        bounds.extend(center);

        doctors.forEach((doctor: any) => {
            bounds.extend(new window.google.maps.LatLng(doctor.lat, doctor.lng));
        });

        map.fitBounds(bounds);





        setMap(map)
    }, [location, doctors, selectedDoctor, center])

    const onUnmount = React.useCallback(function callback() {
        setMap(null)
    }, [])


    useEffect(() => {
        const directionsService = new window.google.maps.DirectionsService();
        const directionsRenderer = new window.google.maps.DirectionsRenderer({
            polylineOptions: {
                strokeColor: "#014737", // change to your desired color
                strokeOpacity: 0.8, // change to your desired opacity
                strokeWeight: 8, // change to your desired weight
            },
        });
        
        directionsRenderer.setMap(map);

        if (selectedDoctor) {

            directionsService.route(
                {
                    origin: center,
                    destination: selectedDoctor,
                    travelMode: window.google.maps.TravelMode.DRIVING,
                },
                (result, status) => {
                    if (status === window.google.maps.DirectionsStatus.OK) {
                        directionsRenderer.setDirections(result);
                    } else {
                        console.error(`error fetching directions ${result}`);
                    }
                }
            );
        }
    }, [selectedDoctor, map, center])



    if (error) {
        toast.error("Unable to retrieve your location")
    }

    const getDoctors = async (data) => {
        try {
            setLoader(true)

            const response: any = await publicAction.searchDoctorByLocation(data)
            console.log(response, 'response')
            setDoctors(response?.doctors)
        } catch (error) {
            errorHandler(error)
        } finally {
            setLoader(false)
        }
    }

    useEffect(() => {
        if (location.lat && location.lng) {
            console.log(location, 'location')
            const data = {
                lat: location.lat,
                lng: location.lng,
                distance: 10
            }
            getDoctors(data)
        }
    }, [location])

    return (
        <div>

            <Header />
            <div className="h-full">
                {loader ? <><Loader /></> : isLoaded ? error ? <>
                    <p>Unable Location to show doctors near you</p>

                </> : (
                    <div className="grid grid-cols-12 w-full">
                        <div className="col-span-3 flex flex-col gap-5 p-3 ">

                            <Select onValueChange={(e) => getDoctors({
                                lat: location.lat,
                                lng: location.lng,
                                distance: Number(e)
                            })} >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Search In Kilometers" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">1</SelectItem>
                                    <SelectItem value="10">10</SelectItem>
                                    <SelectItem value="20">20</SelectItem>
                                    <SelectItem value="30">30</SelectItem>
                                    <SelectItem value="40">40</SelectItem>
                                    <SelectItem value="50">50</SelectItem>
                                </SelectContent>
                            </Select>
                            {doctors?.map((doctor: any, index: number) => (
                                <DoctorCard setSelectedDoctor={setSelectedDoctor} key={index} data={doctor} location={location} />
                            ))}
                        </div>
                        <div className="col-span-9 w-full">
                            <GoogleMap

                                mapContainerStyle={containerStyle}
                                // center={center}
                                zoom={10}
                                onLoad={onLoad}
                                onUnmount={onUnmount}
                            >
                                <Marker
                                    position={center}

                                />
                                {doctors?.map((mark, index) => (
                                    <Marker
                                        key={index}
                                        position={{ lat: mark.lat, lng: mark.lng }}

                                    />
                                ))}
                                <></>
                            </GoogleMap>
                        </div>
                    </div>
                ) : <></>}
            </div>
        </div>
    )
}

export default FindDoctors