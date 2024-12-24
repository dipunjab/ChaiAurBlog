import React, { useState } from 'react'

import { IoAddCircle } from "react-icons/io5";
import ModalPost from './ModalPost';


function AddPost({ addNewPost }) {

  let [isModal, setModal] = useState(false)

  const handleModal = () => {
    setModal(!isModal)
  }

  return (
    <>
      <div className=' w-80  cursor-pointer rounded-full p- border-2 border-gray bg-gray-100' onClick={handleModal}>
        <div className='flex gap-6 border-2 border-gray-200 rounded-full bg-slate-200 p-3'>
          <input readOnly type="text" value="Your Post" className='cursor-pointer p-1 rounded-full text-gray-400 font-semibold' />
          <div>
            <IoAddCircle className='w-10 h-10' />
          </div>
        </div>
      </div>
      {isModal && (
        <div className="fixed inset-0 z-10 flex items-center justify-center p-4 bg-gray-900 bg-opacity-50">
          <ModalPost close={handleModal} addNewPost={addNewPost} />
        </div>
      )}
    </>
  )
}

export default AddPost
