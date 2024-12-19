import React, { useEffect, useState } from 'react'

import { BiLike } from "react-icons/bi";
import { TfiCommentsSmiley } from "react-icons/tfi";

import uploadService from '../../Appwrite/uploadFile';
import uploadPFPService from '../../Appwrite/uploadPFP';


function PostCard({ content, image, $createdAt, userName, userPFP }) {

    const formattedDate = new Date($createdAt).toLocaleDateString();
    const formattedTime = new Date($createdAt).toLocaleTimeString();

    let [ pfp , setPfp] = useState("")

    useEffect(()=>{
        const profilePicture = async ()=>{
            let pf = await uploadPFPService.filePreview(userPFP)
            setPfp(pf)
        }
        profilePicture()
    },[])


    return (
        <div className='mt-5 w-64 sm:w-3/4 h-2/3 border-2 border-orange-700 rounded-lg'>
            <div className="flex flex-row items-start mx-2 md:gap-96 ">
                <div className='flex'>
                    <img
                        src={pfp || null}
                        alt="Profile"
                        className="rounded-full md:w-12 md:h-12 w-8 h-8"
                    />
                    <p className="text-left font-bold">{userName || "USER"}</p>
                </div>

                <div className='ml-14'>
                    <h1>Date: {formattedDate}</h1>
                    <h1>Time: {formattedTime}</h1>
                </div>
            </div>
            <hr />
            <div className='mt-2 ml-2'>
                {content}
            </div>
            <div className='flex justify-center items-center my-4'>
                <img className='rounded md:w-52 md:h-52 w-40 h-40' src={uploadService.filePreview(image)} alt="" />
            </div>
            <hr />
            <div className='flex justify-around my-2 mx-2'>
                <div className='flex md:gap-8 gap-2'>
                    <BiLike className='md:w-6 md:h-6' />
                    <TfiCommentsSmiley className='md:w-6 md:h-6' />
                </div>
                <div>
                    <input className='border-2 border-gray-200 rounded-2xl p-1' type="text" placeholder='Comment...' />
                </div>
            </div>
        </div>
    )
}

export default PostCard
