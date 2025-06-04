import Navbar from '@/components/navbar'
import TracklistItem from '@/components/tracklist-item'
import React from 'react'

const Dj = () => {
  const trackList = [{
    title: "Quantum Drift",
    artist: "Pens",
    categories: ["Bass", "130", "Dark, Groovy"],
    thumbnail: "/quantumDrift.png",
    id: 1
  },
  {
    title: "Track1",
    artist: "Ostblock",
    categories: ["Bass", "130", "Dark, Groovy"],
    thumbnail: "/track1.png",
    id: 2
  }
  ]

  return (
    <div className='w-full'>
      <Navbar />
      <div className='w-full mt-11 px-32 flex flex-col gap-2.5'>
        {trackList.map(track => <TracklistItem key={track.id} track={track} />)}
      </div>
    </div>
  )
}

export default Dj