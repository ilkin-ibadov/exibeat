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

const FeedbackModal = (
) => {
    const messages = [
        {
            body: "Hi! I hope you're well! Would love you to check on thoses tracks for your next gigs <3 Any feedback is super appreciated <3",
            track: {
                title: "Quantum Drift",
                artist: "Pens",
                categories: ["Bass", "130", "Dark, Groovy"],
                thumbnail: "/quantumDrift.png",
                id: 1
            },
            type: 'received',
            timestamp: "2025-06-03T15:30:00Z",
            read: true
        },
        {
            body: "hey, thank for your message",
            type: 'sent',
            timestamp: "2025-06-03T16:00:00Z",
            read: true,
        },
    ]

    return (
        <Dialog>
            <form className="w-full max-w-fit">
                <DialogTrigger asChild>
                    <button className='min-w-fit hover:cursor-pointer'>
                        <p className='text-xs font-medium leading-4 underline min-w-fit'>Send feedback</p>
                        <p className='text-[8px] leading-3 min-w-fit text-end'>1 unread message</p>
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

                        <h2 className="font-bold leading-4">Pens</h2>
                    </div>

                    <div className="flex flex-col gap-4 pt-4 pb-12 h-full max-h-[390px] overflow-y-scroll">
                        <p className="text-xs leading-4 font-bold text-[#6C6C89] text-center">Monday 16:00</p>
                        {messages.map((message, index) => (
                            <div key={index} className={`flex items-start gap-2 ${message.type === 'received' ? 'flex-row' : 'flex-row-reverse'}`}>
                                <div className={`px-2 py-1 rounded-lg ${message.type === 'received' ? 'bg-[#F7F7F8]' : 'bg-[#E9EBFE]'}`}>
                                    <p className="text-sm leading-5 text-[#121217]">{message.body}</p>

                                    {message.track && (
                                        <div className="max-w-[60%] mt-1 flex items-center gap-1 py-1 px-2 bg-white border-[1px] border-[#D2D2D2] border-dashed rounded-md">
                                            <Image
                                                src={message.track.thumbnail}
                                                alt={message.track.title}
                                                width={24}
                                                height={24}
                                                priority
                                            />
                                            <p className="leading-5 text-sm font-bold">{message.track.title}</p>
                                        </div>
                                    )}

                                    <div className="flex items-end gap-1 justify-end">
                                        <p className="text-xs leading-4 text-[#121217] mt-1">{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</p>
                                        <CheckCheck size={14} color={message.read ? "#273AF4" : "#121313"} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center gap-4 pt-2 border-t-[1px] border-[#F3F3F3]">
                        <Input placeholder="Write your feedback...." className="py-2 px-4 bg-[#F7F7F8]" id="message" name="message" />

                        <button className="bg-[#273AF4] w-fit text-xs text-white leading-4 font-bold py-1 px-8 hover:cursor-pointer rounded-sm" type="submit">Send</button>
                    </div>
                </DialogContent>
            </form>
        </Dialog>
    )
}

export default FeedbackModal