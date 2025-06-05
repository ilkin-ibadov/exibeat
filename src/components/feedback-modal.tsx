"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import Image from "next/image";
import { CheckCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { FeedbackModalProps, Message } from "@/types/types";

const FeedbackModal = (
    { track, selectedTrack, setSelectedTrack }: FeedbackModalProps
) => {
    const myId = '68408fb886657a62a8769a77'
    const [messages, setMessages] = useState<Message[]>([])
    const [feedback, setFeedback] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const date = messages[0]?.timestamp ? new Date(messages[0]?.timestamp) : null
    const formattedDayTime = date ? date.toLocaleString([], {
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    }) : ''

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NDA4ZmI4ODY2NTdhNjJhODc2OWE3NyIsInJvbGUiOiJkaiIsImlhdCI6MTc0OTA2Mzc3MiwiZXhwIjoxNzQ5NjY4NTcyfQ.nzv23jEvOPCctEZgOsxSQcxY-CsE9WY6U-GjJ27ZvoA'

    const getMessages = async () => {
        setLoading(true)
        try {
            const response = await fetch(`http://localhost:3001/api/messages/track/${selectedTrack}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setMessages(data)
            }
        } catch (error) {
            console.error("Error fetching messages:", error);
        } finally {
            setLoading(false);
        }
    }

    const sendFeedback = async () => {
        if (!feedback.trim()) return;
        try {
            const response = await fetch('http://localhost:3001/api/messages/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    content: feedback,
                    trackId: selectedTrack,
                    recipientId: track.producer._id,
                })
            });

            if (response.ok) {
                setFeedback('');
                getMessages();
            } else {
                console.error("Failed to send feedback");
            }
        } catch (error) {
            console.error("Error sending feedback:", error);
        }
    }

    useEffect(() => {
        if(selectedTrack) getMessages();
    }, [selectedTrack])


    return (
        <Dialog>
            <form className="w-full max-w-fit">
                <DialogTrigger asChild>
                    <button onClick={() => {
                        setSelectedTrack(track._id)
                    }} className='min-w-fit hover:cursor-pointer'>
                        <p className='text-xs font-medium leading-4 underline min-w-fit'>Send feedback</p>
                        {track.hasMessage && <p className='text-[8px] leading-3 min-w-fit text-end'>1 unread message</p>}
                    </button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[675px] h-fit max-h-[585px] gap-0 pb-4">
                    <DialogHeader className="pb-6">
                        <DialogTitle className="text-2xl leading-8 font-semibold text-center">SEND FEEDBACK</DialogTitle>
                    </DialogHeader>

                    <div className="max-h-fit flex items-center gap-2 border-y-[1px] border-[#F3F3F3] py-2 px-4">
                        <Image
                            className="rounded-full bg-zinc-300"
                            src="/quantumDrift.png"
                            alt="quantumDrift"
                            width={39}
                            height={39}
                            priority
                        />

                        <h2 className="font-bold leading-4">{track.producer.username}</h2>
                    </div>

                    <div className="flex flex-col gap-4 pt-4 pb-12 h-full max-h-[390px] overflow-y-scroll">

                        {loading ? <p className="text-xs text-center">Loading messages...</p>
                            :
                            <>
                                {formattedDayTime && <p className="text-xs leading-4 font-bold text-[#6C6C89] text-center">{formattedDayTime}</p>}
                                {
                                    messages.map((message, index) => (
                                        <div key={index} className={`flex items-start gap-2 ${message.sender._id !== myId ? 'flex-row' : 'flex-row-reverse'}`}>
                                            <div className={`px-2 py-1 rounded-lg ${message.sender._id !== myId ? 'bg-[#F7F7F8]' : 'bg-[#E9EBFE]'}`}>
                                                <p className="text-sm leading-5 text-[#121217]">{message.content}</p>

                                                {message.track && message.sender._id !== myId && (
                                                    <div className="min-w-fit max-w-[70%] mt-1 flex items-center gap-1 py-1 px-2 bg-white border-[1px] border-[#D2D2D2] border-dashed rounded-md">
                                                        <Image
                                                            src='/quantumDrift.png'
                                                            alt={message.track.title}
                                                            width={24}
                                                            height={24}
                                                            priority
                                                        />
                                                        <p className="leading-5 text-sm font-bold min-w-fit">{message.track.title}</p>
                                                    </div>
                                                )}

                                                <div className="flex items-end gap-1 justify-end">
                                                    <p className="text-xs leading-4 text-[#121217] mt-1">{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</p>
                                                    <CheckCheck size={14} color={message.read ? "#273AF4" : "#121313"} />
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </>
                        }
                    </div>

                    <div className="flex items-center gap-4 pt-2 border-t-[1px] border-[#F3F3F3]">
                        <Input onChange={(e) => {
                            setFeedback(e.target.value);
                        }} placeholder="Write your feedback...." className="py-2 px-4 bg-[#F7F7F8]" id="message" name="message" />

                        <button onClick={(e) => {
                            e.preventDefault();
                            sendFeedback();
                        }} className="bg-[#273AF4] w-fit text-xs text-white leading-4 font-bold py-1 px-8 hover:cursor-pointer rounded-sm">Send</button>
                    </div>
                </DialogContent>
            </form>
        </Dialog>
    )
}

export default FeedbackModal