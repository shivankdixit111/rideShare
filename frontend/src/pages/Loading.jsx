import React from 'react'

const Loading = () => {
  return (
    <div className='flex items-center justify-center fixed inset-0'>
        <div className='h-12 w-12 rounded-full border-4 border-t-transparent border-blue-600 animate-spin'></div>
    </div>
  )
}

export default Loading