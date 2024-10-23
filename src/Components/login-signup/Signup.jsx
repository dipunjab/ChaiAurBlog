import React, { useState } from 'react';
import PageLayout from './PageLayout';
import pfp from "../../assets/pfp.png";

function Signup() {

  const [selectedImage, setSelectedImage] = useState(pfp);

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

  return (
    <PageLayout>
      <h1 className="absolute left-1/2 sm:text-2xl font-bold text-center">Register</h1>
      <div className="flex flex-col md:flex-row h-full md:space-x-8">

        <div className="md:w-1/2 flex flex-col justify-center md:ml-24 ml-10">
          <form className="space-y-4">
            <div className="md:w-1/2 flex flex-col justify-center items-center md:ml-10 mt-8 md:mt-0">
              <div className="relative w-24 h-24">
                <img
                  src={selectedImage}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border border-gray-400"
                />
                <input
                  type="file"
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
              className="border p-3 text-sm rounded-xl sm:w-2/3 focus:border-customOrange"
              placeholder="Enter your full name"
              required
            />
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              className="border p-3 text-sm rounded-xl sm:w-2/3 focus:border-customOrange"
              placeholder="Enter your email"
              required
            />
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <input
              type="password"
              id="password"
              className="border p-3 text-sm rounded-xl sm:w-2/3 focus:border-customOrange"
              placeholder="Enter your password"
              required
            />
          </form>
        </div>
            <div className="flex flex-col mt-6 justify-center items-center w-full  md:w-auto ">
              <button className="bg-customOrange hover:bg-orange-300 text-white p-3 w-2/4 h-12 rounded-full transition duration-300 md:w-3/4">
                Sign Up
              </button>
              <p className="mt-4">Already have an account? <a href="/login" className="text-orange-600 font-bold">Login</a></p>
            </div>
      </div>
    </PageLayout>
  );
}

export default Signup;
