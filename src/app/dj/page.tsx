'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/navbar'
import TracklistItem from '@/components/tracklist-item'
import React from 'react'
import { Track } from "@/types/types";

const Dj = () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NDA4ZmI4ODY2NTdhNjJhODc2OWE3NyIsInJvbGUiOiJkaiIsImlhdCI6MTc0OTA2Mzc3MiwiZXhwIjoxNzQ5NjY4NTcyfQ.nzv23jEvOPCctEZgOsxSQcxY-CsE9WY6U-GjJ27ZvoA'
  const [trackList, setTrackList] = useState<Track[]>([])
  const [selectedTrack, setSelectedTrack] = useState("")

  const getTrackList = async () => {
    try {
      const response = await fetch('https://localhost:3001/api/tracks/dj/review-tracks', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response)
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