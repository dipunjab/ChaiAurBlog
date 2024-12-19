import React, { useEffect, useState } from 'react';
import AddPost from './AddPost/AddPost';
import PostCard from './PostCard/PostCard';
import service from '../Appwrite/post';

function Home() {

  const [posts, setPosts] = useState([])

  useEffect(()=>{
    service.getAllPosts().then((posts)=>{
      if(posts) setPosts(posts.documents)
        // console.log(posts.documents[0].$createdAt);
        
    })
  },[])

  // console.log(posts)

  const addNewPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]); // Add the new post at the top of the list
  };

  return (
    <div className='p-3 flex flex-col justify-center items-center mt-10'>
     <div className='mb-2'>
      <AddPost addNewPost={addNewPost}/>
     </div>
       <h1 className='underline'>Feeds</h1>
       {posts.length === 0 ? (
        <p>No posts available</p>  
      ) : (
        posts.sort((a,b)=>  new Date(b.$createdAt) - new Date(a.$createdAt)).map((post) => (
          <PostCard key={post.$id} {...post} />  
        ))
      )}
    </div>
  );
}

export default Home;
