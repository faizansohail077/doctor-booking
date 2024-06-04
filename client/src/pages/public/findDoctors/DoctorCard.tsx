const DoctorCard = ({ data, location,setSelectedDoctor }: any) => {

    function getDistanceInKm(lat1:any, lon1:any, lat2:any, lon2:any) {
        const R = 6371; // Radius of the earth in km
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in km
        return distance;
    }

    function deg2rad(deg) {
        return deg * (Math.PI / 180);
    }


    return (
        <div className="flex items-center justify-between cursor-pointer hover:bg-deepTeal group p-3" >
            <div className="flex items-center gap-3">
                <img className="h-12 w-12 rounded-full object-cover" src={data?.profile_image?.url} />
                <div className="flex flex-col">
                    <p className="group-hover:text-white" > {data?.fullName}</p>
                    <p className="text-xs text-gray-400" >{getDistanceInKm(data?.lat, data?.lng, location?.lat, location?.lng).toFixed(2)}km</p>
                </div>
            </div>
            <div className="flex flex-col">

            <p  className="group-hover:text-white">Contact</p>
            <p onClick={()=>setSelectedDoctor(data)} className="text-xs group-hover:text-white">Get Direction</p>
            </div>
        </div>
    )
}

export default DoctorCard