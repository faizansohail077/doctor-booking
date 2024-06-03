import { ImageUploader } from "@/components";
import { useEffect, useState } from "react";

const Photo = ({ addressData }: { addressData: any }) => {

    const [images, setImages] = useState<any>([]);
    const maxNumber = 1;

    useEffect(() => {
        setImages(addressData?.profile_image ? [addressData?.profile_image] : [])
    }, [addressData])

    

    return (
        <div>
            <ImageUploader showUploader={false} showDeleteAll={false} images={images} setImages={setImages} maxNumber={maxNumber} />
        </div>
    )
}

export default Photo