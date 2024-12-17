import React from 'react'
import chai from "../assets/chai.jpg"

function Title() {
  return (
    <div className='text-center flex justify-center'>
      <h1 className='mt-8 font-mono text-3xl text-customOrange font-bold'>Chai Aur Blog</h1>
      <img src={chai} alt="logo" className='w-20 h-20'/>
    </div>
  )
}

export default Title
