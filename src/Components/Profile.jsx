import React, { useEffect, useState } from 'react';
import PostCard from './PostCard/PostCard';
import service from '../Appwrite/post';
import authService from "../Appwrite/auth"
import EditProfile from './EditProfile';

function Profile() {

  const [posts, setPosts] = useState([])
  const [currUserID, setCurrUSerId] = useState("")

  useEffect(() => {
    const fetchUser = async () => {
      const user = await authService.getCurrentUser();
      setCurrUSerId(user.$id);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const allPosts = await service.getAllPosts();
      if (allPosts && allPosts.documents) {
        const userPosts = allPosts.documents.filter((post) => post.userID === currUserID);
        setPosts(userPosts);
      }
    };

    if (currUserID) {
      fetchPosts();
    }
  }, [currUserID]);

  //Edit profile modal
  let [isModal, setModal] = useState(false)

  const handleModal = () => {
    setModal(!isModal)
  }

  const deletePostFromList = (postID) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.$id !== postID));
  };

  return (
    <div className='p-3 flex flex-col justify-center items-center mt-10'>
      <div>
        <button onClick={handleModal} className='border border-3 border-cyan-300 bg-cyan-400 p-2 rounded-xl'>Edit Profiel</button>
        {isModal && <EditProfile close={handleModal} />}
      </div>
      <h1 className='underline'>Your Posts</h1>
      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        posts.sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt)).map((post) => (
          <PostCard key={post.$id} {...post} deletePostFromList={deletePostFromList}/>
        ))
      )}
    </div>
  );
}

export default Profile;
