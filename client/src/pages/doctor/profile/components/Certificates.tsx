import { ImageUploader } from "@/components"
import { Button } from "@/components/ui/button";
import { errorHandler } from "@/lib/helpers";
import { doctorAction } from "@/store/actions";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Certificates = ({ addressData, setAddressData }: { addressData: any, setAddressData: any }) => {
    const [images, setImages] = useState<any>([]);
    const [submitting, setIsSubmitting] = useState(false)
    const maxNumber = 5;

    useEffect(() => {
        setImages(addressData?.certificates ? addressData?.certificates : [])
    }, [addressData])

    const save = async () => {
        if (!images.length) return toast.error("Please upload atleast 1 certificate")
        const id = toast.loading("Submitting...")
        setIsSubmitting(true)
        try {
            const result: any = await doctorAction.update_doctor_details({ certificates: images })
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
            <ImageUploader images={images} setImages={setImages} maxNumber={maxNumber} />
            <div className="flex items-center justify-end">
                <Button onClick={() => save()} disabled={submitting} >Save</Button>
            </div>
        </div>
    )
}

export default Certificates