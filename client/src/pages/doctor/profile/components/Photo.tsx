import { ImageUploader } from "@/components";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Photo = () => {
    const [images, setImages] = useState([]);
    const maxNumber = 1;
   
    return (
        <div>
            <ImageUploader showDeleteAll={false} images={images} setImages={setImages} maxNumber={maxNumber} />
            <div className="flex items-center justify-end">
                <Button>Save</Button>
            </div>
        </div>
    )
}

export default Photo