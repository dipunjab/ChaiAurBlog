import React, { useEffect, useState } from 'react'

import { BiLike } from "react-icons/bi";
import { TfiCommentsSmiley } from "react-icons/tfi";
import { FcLike } from "react-icons/fc";

import authService from "../../Appwrite/auth"
import uploadService from '../../Appwrite/uploadFile';
import uploadPFPService from '../../Appwrite/uploadPFP';
import likeService from "../../Appwrite/like"
import Comment from './Comment';
import service from '../../Appwrite/post';
import commentService from '../../Appwrite/comment';

function PostCard({ $id, content, image, $createdAt, userName, userPFP, userID, deletePostFromList }) {

    const formattedDate = new Date($createdAt).toLocaleDateString();
    const formattedTime = new Date($createdAt).toLocaleTimeString();

    let [pfp, setPfp] = useState("")

    let postID = $id

    useEffect(() => {
        const profilePicture = async () => {
            let pf = await uploadPFPService.filePreview(userPFP)
            setPfp(pf)
        }
        profilePicture()
    }, [])


    //Likes Of Post
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [likeID, setLikeID] = useState(null);
    const [currUserID, setCurrUSerId] = useState("")

    useEffect(() => {
        const fetchLikes = async () => {
            await authService.getCurrentUser().then((user) => setCurrUSerId(user.$id));

            const likeData = await likeService.getLikesByPost(postID);
            setLikeCount(likeData.total);

            const userLike = await likeService.getUserLikeOnPost(currUserID, postID);
            if (userLike) {
                setLiked(true);
                setLikeID(userLike.$id);
            }
        };
        fetchLikes();
    }, [postID, currUserID]);


    const toggleLike = async () => {
        if (liked) {
            await likeService.unlikePost(likeID);
            setLiked(false);
            setLikeCount(prev => prev - 1);
        } else {
            const likeRes = await likeService.likePost({  userID:currUserID, postID });
            setLiked(true);
            setLikeCount(prev => prev + 1);
            setLikeID(likeRes.$id);
        }
    };


    const [commentCount, setCommentCount] = useState(0)
    useEffect(()=>{
        const fetchComments = async () => {
            try {
                const postComment = await commentService.getCommentsByPost({postID:postID});
        
                if (postComment && postComment.total !== undefined) {
                    setCommentCount(postComment.total);
                } else {
                    console.log("No comments found for this post.");
                    setCommentCount(0);
                }
            } catch (error) {
                console.error("Failed to fetch comments:", error);
                setCommentCount(0); 
            }
        };
        fetchComments()
    },[postID])

    const handleDelete = () => {
        const deletePost = service.deletePost($id)
        if (deletePost) {
            uploadService.deleteFile(image)
            deletePostFromList($id)
            console.log("post delted");
        }
    }



    return (
        <div className="mt-5 w-64 sm:w-3/4 h-auto bg-white border border-gray-200 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out">
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
                    {currUserID === userID ? <button onClick={handleDelete}>DELETE</button> : null}
                </div>

            </div>
            <hr />
            <div className='mt-2 ml-2'>
                {content}
            </div>
            {image && image !== "" && (
                <div className='flex justify-center items-center my-4'>
                    <img className='rounded md:w-52 md:h-52 w-40 h-40' src={uploadService.filePreview(image)} alt="image" />
                </div>
            )}
            <hr />
            <div className='flex justify-around my-2 mx-2'>
                <div className='flex md:gap-8 gap-2'>
                    <div onClick={toggleLike} className='flex cursor-pointer'>
                        {!liked ?
                            <BiLike className={`md:w-6 md:h-6`} /> :
                            <FcLike className={`md:w-6 md:h-6`} />}
                        <span>{likeCount}</span>
                    </div>
                    <TfiCommentsSmiley className='md:w-6 md:h-6' />
                    <span>{commentCount}</span>
                </div>
                <Comment postID={$id} setCommentCount={setCommentCount}/>
            </div>
        </div>
    )
}

export default PostCard
