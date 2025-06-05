"use client"

import React, { useState } from 'react'
import { Pause, Play } from 'lucide-react';
import Image from "next/image";
import { Progress } from "@/components/ui/progress"
import FeedbackModal from './feedback-modal';
import { TracklistItemProps } from '@/types/types';

const TracklistItem: React.FC<TracklistItemProps> = ({ track, selectedTrack, setSelectedTrack }) => {
    const progress = 30
    const [isPlaying, setIsPlaying] = useState(false)
    const categories = ["Bass", "130", "Dark, Groovy"]

    return (
        <div className='w-full flex items-center gap-2'>
            <div className='min-w-[198px] flex items-center gap-4'>
                <div className='flex items-center gap-2'>
                    <button onClick={() => {
                        setIsPlaying(prevState => !prevState)
                    }} className='hover:cursor-pointer'>{isPlaying ? <Pause size={14} fill='black' /> : <Play size={14} fill='black' />}</button>

                    <Image
                        src="/quantumDrift.png"
                        alt={track.title}
                        width={48}
                        height={48}
                        priority
                    />
                </div>

                <div>
                    <h2 className="font-bold text-sm leading-5">
                        {track.title.length > 10 ? `${track.title.slice(0, 10)}...` : track.title}
                    </h2>
                    <h3 className='text-xs text-[#121217]'>{track.producer.username}</h3>
                </div>
            </div>

            <div className='w-full flex flex-col justify-center gap-2'>
                <Progress value={progress} className="w-full max-w-[560px] h-1 rounded-none" />
                <div className='flex items-center gap-1'>
                    {categories.map(category => <div key={category} className='w-fit rounded-full text-xs font-bold leading-4 px-2 border-[1px] border-[#D2D2D2] text-[#273AF4]'>{category}</div>)}
                </div>
            </div>

            <FeedbackModal track={track} selectedTrack={selectedTrack} setSelectedTrack={setSelectedTrack} />
        </div>
    )
}

export default TracklistItem