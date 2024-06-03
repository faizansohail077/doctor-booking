import { ImageUploader } from "@/components"
import { useEffect, useState } from "react";

const Certificates = ({ addressData }: { addressData: any }) => {
    const [images, setImages] = useState<any>([]);
    const maxNumber = 5;

    useEffect(() => {
        setImages(addressData?.certificates ? addressData?.certificates : [])
    }, [addressData])

    // const save = async () => {
    //     if (!images.length) return toast.error("Please upload atleast 1 certificate")
    //     const id = toast.loading("Submitting...")
    //     setIsSubmitting(true)
    //     try {
    //         const result: any = await doctorAction.update_doctor_details({ certificates: images })
    //         toast.dismiss(id)
    //         toast.success(result?.message)
    //         setAddressData(result?.user)
    //     } catch (error: any) {
    //         toast.dismiss(id)
    //         errorHandler(error)
    //     } finally {
    //         setIsSubmitting(false)
    //     }
    // }



    return (
        <div>
            <ImageUploader showUploader={false}  images={images} setImages={setImages} maxNumber={maxNumber} />
            {/* <div className="flex items-center justify-end">
                <Button onClick={() => save()} disabled={submitting} >Save</Button>
            </div> */}
        </div>
    )
}

export default Certificates