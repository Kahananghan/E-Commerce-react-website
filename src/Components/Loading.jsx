import React from 'react'
import Loader from '../../public/circle_loader.gif'

function Loading() {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <img className='w-[15%]' src={Loader} />
    </div>
  )
}

export default Loading
