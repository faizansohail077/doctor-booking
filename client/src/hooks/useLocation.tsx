import React, { useEffect, useState } from 'react'

const useLocation = () => {
    const [location, setLocation] = React.useState({ lat: null, lng: null });
    const [error, setError] = useState("")


    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, getError);
        } else {
            console.log("Geolocation not supported");
        }
    }, [])

    function success(position:any) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setLocation({ lat, lng });
    }

    function getError() {
        setError("Unable to retrieve your location");
    }

    return { location, error }
}

export default useLocation