'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/navbar'
import TracklistItem from '@/components/tracklist-item'
import React from 'react'
import { Track } from "@/types/types";

const Dj = () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NDM4MTVjYzg2OGNkOTg0OTk4OTdjYyIsInJvbGUiOiJkaiIsImlhdCI6MTc0OTI4NTk0MSwiZXhwIjoxNzQ5ODkwNzQxfQ.ROBLkwwYKHLFhDl0cjBa9qH3vVED4BZ-mN-3b8I4H0Y'
  const [trackList, setTrackList] = useState<Track[]>([])
  const [selectedTrack, setSelectedTrack] = useState("")

  const getTrackList = async () => {
    try {
      const response = await fetch('https://ilkinibadov.com/api/tracks/dj/review-tracks', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setTrackList(data);
      }

    } catch (error) {
      console.error("Error fetching track list:", error);
    }
  }

  useEffect(() => {
    getTrackList();
  }, [])

  return (
    <div className='w-full'>
      <Navbar />
      <div className='w-full mt-11 px-32 flex flex-col gap-2.5'>
        {trackList.map(track =>
          <TracklistItem
            key={track._id}
            track={track}
            selectedTrack={selectedTrack}
            setSelectedTrack={setSelectedTrack} />)}
      </div>
    </div>
  )
}

export default Dj