import React, { useState } from 'react';
import PageLayout from './PageLayout';
import pfp from "../../assets/pfp.png";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import authService from "../../Appwrite/auth"
import uploadPFPService from '../../Appwrite/uploadPFP';

import { useForm } from 'react-hook-form';
import chaigip from "../../assets/chaigif.gif"

function Signup() {

  //handling selected pfp preview
  const [selectedImage, setSelectedImage] = useState(pfp);
  const [loading, setLoading] = useState(false)

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  //creating account with appwrite
  const { register, handleSubmit } = useForm()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const create = async (data) => {
    try {
      setLoading(true)
      let pfpID = null;

      if (data.profilePicture && data.profilePicture.length > 0) {
        const file = data.profilePicture[0];
        const uploadedFile = await uploadPFPService.uploadFile(file);

        if (uploadedFile) {
          console.log("Uploaded file:", uploadedFile);
          pfpID = uploadedFile.$id
        } else {
          console.error("Profile picture upload failed");
          alert("Failed to upload profile picture.");
          return;
        }
      }

      const userData = await authService.createAccount({ ...data, profilePicture: pfpID })
      console.log("User data:", userData);

      if(userData){
        alert("Created Successfully");
        navigate("/login");
      }

    } catch (error) {
      console.error("Account creation error:", error);
      alert(error.message || "An error occurred");
    } finally {
      setLoading(false)
    }
  }



  return (
    <PageLayout>
      {loading && 
      <div className="fixed inset-0 z-10 flex items-center justify-center p-4 bg-gray-900 bg-opacity-50">
         <div className='bg-customOrange p-3'> 
            <h1> Preparing Your chai.... <img src={chaigip} alt="" /></h1>
         </div>
        </div>
      }
      <h1 className="absolute left-1/2 sm:text-2xl font-bold text-center">Register</h1>
      <div className="flex flex-col md:flex-row h-full md:space-x-8">

        <div className="md:w-1/2 flex flex-col justify-center md:ml-24 ml-10">
          <form className="space-y-4" onSubmit={handleSubmit(create)}>
            <div className="md:w-1/2 flex flex-col justify-center items-center md:ml-10 mt-8 md:mt-0">
              <div className="relative w-24 h-24">
                <img
                  src={selectedImage}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border border-gray-400"
                />
                <input
                  type="file"
                  {...register("profilePicture", { required: true })}
                  id="profileImage"
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </div>
            <label htmlFor="fullName" className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              id="fullName"
              {...register("name", { required: true })}
              className="border p-3 text-sm rounded-xl sm:w-2/3 focus:border-customOrange"
              placeholder="Enter your full name"
              required
            />
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              {...register("email", { required: true })}
              className="border p-3 text-sm rounded-xl sm:w-2/3 focus:border-customOrange"
              placeholder="Enter your email"
              required
            />
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <input
              type="password"
              id="password"
              {...register("password", { required: true })}
              className="border p-3 text-sm rounded-xl sm:w-2/3 focus:border-customOrange"
              placeholder="Enter your password"
              required
            />
          <button type='submit' className="bg-customOrange hover:bg-orange-300 text-white p-3 w-2/4 h-12 rounded-full transition duration-300 md:w-3/4">
            Sign Up
          </button>
          </form>
        </div>
        <div className="flex flex-col mt-6 justify-center items-center w-full  md:w-auto ">
          <p className="mt-4">Already have an account? <a href="/login" className="text-orange-600 font-bold">Login</a></p>
        </div>
      </div>
    </PageLayout>
  );
}

export default Signup;
