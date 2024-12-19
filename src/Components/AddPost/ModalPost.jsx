import React, { useState } from "react";

import uploadService from "../../Appwrite/uploadFile"
import authService from "../../Appwrite/auth"
import service from "../../Appwrite/post"

const ModalPost = ({close , addNewPost}) => {

  const [content, setContent] = useState("");
  const [image, setImage] = useState("")
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(""); 

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]); 
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true)
    setError("");

    let userId = await authService.getCurrentUser().then((userData)=> (userData.$id))
    let userName = await authService.getCurrentUser().then((userData)=> (userData.name))
    let userPFP = await authService.getCurrentUser().then((userData)=> (userData.prefs?.profilePicture))

    console.log(userName);
    
    console.log(userPFP)

    try {
      let imageid = null;
      if(image){
        const upload = await uploadService.uploadFile(image)
        imageid = upload?.$id
      }

      const newPost = await service.createPost({
        content,
        image: [imageid],
        status: "published",
        userID: userId,
        userName: userName,
        userPFP: userPFP
      })

      addNewPost(newPost)

      setContent("");
      setImage(null);
      close();

    } catch (error) {
      console.error("Failed to create post:", err);
      setError("Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }


    console.log("Content:", content);
  };

  return (
    <div className="absolute bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-bold mb-4">Add Post</h2>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full px-3 py-2 border rounded-md resize-none"
          value={content}
          onChange={handleChange}
          placeholder="Enter your content here"
        ></textarea>
        <input type="file" onChange={handleImageChange}/>
        <div className="mt-4 flex gap-1 justify-end">
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus"
            disabled={loading}
          >
            {loading ? "Posting..." : "Post"}
          </button>
          <button
            type="button"
            onClick={close}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
          </form>
         </div>
  )   
}

export default ModalPost