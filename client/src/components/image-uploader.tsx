import { FaTrash } from 'react-icons/fa6';
import ImageUploading from 'react-images-uploading';
import { FaCloudUploadAlt } from "react-icons/fa";
import { Cloudinary_Folders } from '@/enums';
import toast from 'react-hot-toast';
import axios from 'axios';


const ImageUploader = ({ showDeleteAll = true, images, setImages, maxNumber }: { showDeleteAll?: boolean, images: any, setImages: any, maxNumber: number }) => {
    console.log(showDeleteAll)

    const onChange = async (imageList: any) => {
        // data for submit
        const id = toast.loading("Uploading Image");
        try {
            const uploadPromises = imageList.map((item: { data_url: string, file: File }) => uploadImage(item?.file));
            const responses = await Promise.all(uploadPromises);

            // Update images state after all uploads are done
            const newImages = responses.map(resp => ({
                url: resp.data.url,
                public_id: resp.data.public_id
            }));
            toast.dismiss(id);
            setImages([...images, ...newImages]);


        } catch (error) {
            console.log(error, 'error')
            toast.dismiss(id);
        }


    };


    const uploadImage = async (file: File) => {

        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);
        data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_NAME);
        data.append("folder", Cloudinary_Folders.doctor);

        try {
            const resp = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`, data);
            return resp
        } catch (err) {
            toast.error("Something went wrong, please try again later.");
            console.log("errr : ", err);
        } 
    }

    const deleteImage = async (id: string) => {
        console.log(id, 'id')
    }




    return (
        <div>
            <ImageUploading
                multiple
                acceptType={["jpg", "jpeg", "png"]}
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
                maxFileSize={5242880}
            >
                {({
                    onImageUpload,
                    // onImageRemoveAll,
                    // onImageUpdate,
                    // onImageRemove,
                    isDragging,
                    dragProps,
                    errors
                }) => (
                    // write your building UI
                    <div className="-wrapper">
                        <button
                            className='flex flex-col items-center justify-center h-[150px] rounded-md border border-dashed border-deepTeal w-full'
                            style={isDragging ? { color: 'red' } : undefined}
                            onClick={onImageUpload}
                            {...dragProps}
                        >
                            Click or Drop here
                            <FaCloudUploadAlt className='text-deepTeal' size={30} />
                        </button>
                        &nbsp;
                        {/* {showDeleteAll && images?.length > 0 && <button onClick={onImageRemoveAll} className='flex text-red-600 text-sm items-center gap-2'>
                            <FaTrash size={20} />
                            Remove all images
                        </button>} */}
                        <div className="mt-5 flex items-center gap-5 flex-wrap">
                            {images.map((image: { url: string, public_id: string }, index: number) => (
                                <div key={index} className="image-item">
                                    <img className='h-[200px] border border-deepTeal w-[200px] object-cover rounded-md' src={image['url']} alt="" />
                                    <div className="flex items-center justify-between gap-2 my-2">
                                        {/* <button className='text-sm text-deepTeal' onClick={() => onImageUpdate(index)}><MdEdit size={20} /></button> */}
                                        <button className='text-sm text-red-600' onClick={() => deleteImage(image.public_id)}><FaTrash size={20} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {errors && <div className='mt-2' >
                            {errors.maxNumber && <span className='text-red-600 text-sm' >Number of selected images exceed maxNumber</span>}
                            {errors.acceptType && <span className='text-red-600 text-sm'>Your selected file type is not allow</span>}
                            {errors.maxFileSize && <span className='text-red-600 text-sm'>Selected file size exceed maxFileSize <strong>5mb</strong></span>}
                            {errors.resolution && <span className='text-red-600 text-sm'>Selected file is not match your desired resolution</span>}
                        </div>
                        }
                    </div>

                )}
            </ImageUploading>

        </div>
    )
}

export default ImageUploader