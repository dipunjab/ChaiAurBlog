import React, { useState } from 'react'
import authService from '../../Appwrite/auth'
import commentService from '../../Appwrite/comment';

function Comment({ postID ,setCommentCount}) {
    //Comments Of Post

    const [content, setContent] = useState("")
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setContent(e.target.value);
    };


    const hanldeComment = async () => {
        
        try {
            setLoading(true)
            let userID = await authService.getCurrentUser().then((user) => (user.$id));
            let userName = await authService.getCurrentUser().then((userData) => (userData.name))
            let userPFP = await authService.getCurrentUser().then((userData) => (userData.prefs?.profilePicture))
    
            const created = await commentService.createComment({
                content,
                userID: userID,
                postID: postID,
                userName: userName,
                userPFP: userPFP
            })
    
            if(created) 
                {
                    alert(`comment added by ${userName} for ${postID}`)
                    setCommentCount(prev => prev + 1)
                }
        } catch (error) {
            console.log(error)
        }finally {
            setLoading(false)
            setContent("")    
        }

    }


    return (
        <div>
            <input className='border-2 border-gray-200 rounded-2xl p-1' type="text" placeholder='Comment...' value={content} onChange={handleChange} />
            <button className='border-2 border-gray-200 rounded-2xl p-1' onClick={hanldeComment}>+</button>
            {loading && 
            <div className="fixed inset-0 z-10 flex items-center justify-center p-4 bg-gray-900 bg-opacity-50">
                <div className='bg-white'>
                    Adding Comment Please Wait....
                </div>
            </div>}
        </div>

    )
}

export default Comment
