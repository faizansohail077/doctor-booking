import React from 'react';
import { FaTrash } from 'react-icons/fa6';
import { MdEdit } from 'react-icons/md';
import ImageUploading from 'react-images-uploading';
import { FaCloudUploadAlt } from "react-icons/fa";

const ImageUploader = ({ showDeleteAll = true, images, setImages, maxNumber }: { showDeleteAll?: boolean, images: any, setImages: React.Dispatch<React.SetStateAction<never[]>>, maxNumber: number }) => {


    const onChange = (imageList: any, addUpdateIndex: number[] | undefined) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };
    return (
        <div>
            <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
                maxFileSize={5242880}
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
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
                        {showDeleteAll && images?.length > 0 && <button onClick={onImageRemoveAll} className='flex text-red-600 text-sm items-center gap-2'>
                            <FaTrash size={20} />
                            Remove all images
                        </button>}
                        <div className="mt-5 flex items-center gap-5 flex-wrap">
                            {imageList.map((image, index) => (
                                <div key={index} className="image-item">
                                    <img className='h-[200px] border border-deepTeal w-[200px] object-cover rounded-md' src={image['data_url']} alt="" />
                                    <div className="flex items-center justify-between gap-2 my-2">
                                        <button className='text-sm text-deepTeal' onClick={() => onImageUpdate(index)}><MdEdit size={20} /></button>
                                        <button className='text-sm text-red-600' onClick={() => onImageRemove(index)}><FaTrash size={20} /></button>
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