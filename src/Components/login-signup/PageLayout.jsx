import React from 'react'

function PageLayout({children}) {
  return (
    <div className='bg-customOrange w-full h-screen flex justify-center items-center'>
        <div className='bg-white rounded-lg shadow-lg w-4/5 h-4/5 '>
          {children}
        </div>
    </div>
  )
}

export default PageLayout
