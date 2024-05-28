import { ImageUploader } from "@/components"
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Certificates = () => {
    const [images, setImages] = useState([]);
    const maxNumber = 5;
    return (
        <div>
            <ImageUploader images={images} setImages={setImages} maxNumber={maxNumber} />
            <div className="flex items-center justify-end">
                <Button>Save</Button>
            </div>
        </div>
    )
}

export default Certificates