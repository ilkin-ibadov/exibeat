import Navbar from '@/components/navbar'
import ProducerCard from '@/components/producer-card'
import React from 'react'

const Producer = () => {
  return (
    <div className='w-full flex flex-col items-center'>
        <Navbar/>
        <ProducerCard/>
    </div>
  )
}

export default Producer