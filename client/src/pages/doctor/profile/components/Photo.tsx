import { ImageUploader } from "@/components";
import { Button } from "@/components/ui/button";
import { errorHandler } from "@/lib/helpers";
import { doctorAction } from "@/store/actions";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Photo = ({ addressData, setAddressData }: { addressData: any, setAddressData: any }) => {

    const [images, setImages] = useState<any>([]);
    const [submitting, setIsSubmitting] = useState(false)
    const maxNumber = 1;

    useEffect(() => {
        setImages(addressData?.profile_image ? [addressData?.profile_image] : [])
    }, [addressData])

    const save = async () => {
        if (!images.length) return toast.error("Please upload an image")
        const id = toast.loading("Submitting...")
        setIsSubmitting(true)
        try {
            const result: any = await doctorAction.update_doctor_details({ profile_image: images[0] })
            toast.dismiss(id)
            toast.success(result?.message)
            setAddressData(result?.user)
        } catch (error: any) {
            toast.dismiss(id)
            errorHandler(error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div>
            <ImageUploader showDeleteAll={false} images={images} setImages={setImages} maxNumber={maxNumber} />
            <div className="flex items-center justify-end">
                <Button onClick={() => save()} disabled={submitting} >Save</Button>
            </div>
        </div>
    )
}

export default Photo