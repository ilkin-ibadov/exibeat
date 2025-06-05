"use client"

import React, { useState } from 'react'
import Image from "next/image";
import { X } from 'lucide-react';
import MessageModal from './message-modal';
// import useChatSocket from '@/hooks/useChatSocket';

const ProducerCard = () => {
    // const currentUserId = "68408fad86657a62a8769a75";
    // const trackId = "684097b62f720e1c6899095e"
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NDA4ZmFkODY2NTdhNjJhODc2OWE3NSIsInJvbGUiOiJwcm9kdWNlciIsImlhdCI6MTc0OTA4MzM1MCwiZXhwIjoxNzQ5Njg4MTUwfQ.eUQB8V4Azeor-BuxkalroxVYom2ZPoYpsUy3XWqMOdY"
    const recipientId = "68408fb886657a62a8769a77";
    const [files, setFiles] = useState<File[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState("")
    const [filesSubmitted, setFilesSubmitted] = useState(false)
    const [inputDisabled, setInputDisabled] = useState(false)
    // Hook for real-time chat functionality for next step
    // const { sendMessage }: ChatSocket = useChatSocket(
    //     currentUserId,
    //     (data: ChatMessage) => {
    //         console.log("Incoming message:", data);
    //     }
    // );

    const handleSend = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/tracks/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: files[0].name,
                    djId: recipientId,
                    message: message
                })
            })

            if(response.ok){
                setFilesSubmitted(true);
            }
        } catch (error) {
            console.error("Error sending message:", error);
            setError("Failed to send message. Please try again.");
        }
        // sendMessage({
        //     to: recipientId,
        //     from: currentUserId,
        //     trackId,
        //     content: message,
        // });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        const selectedFiles = Array.from(e.target.files || []);

        if (selectedFiles.length + files.length > 3) {
            setError('You can upload up to 3 tracks only.');
            return;
        }

        const validExtensions = ['audio/mpeg', 'audio/wav'];
        const validFiles: File[] = [];

        for (const file of selectedFiles) {
            if (!validExtensions.includes(file.type)) {
                setError('Only MP3 and WAV files are allowed.');
                return;
            }

            if (file.size > 60 * 1024 * 1024) {
                setError('Each file must be less than 60MB.');
                return;
            }

            validFiles.push(file);
        }

        setFiles((prev) => [...prev, ...validFiles]);
    };

    return (
        <div className='w-full max-w-[395px] mt-8 p-8 pt-4 flex flex-col items-center border-[1px] border-dashed border-[#D2D2D2]'>
            <h1 className='font-bold text-xl leading-7'>{filesSubmitted ? "Tracks sent" : "Submit Tracks"}</h1>
            <p className='text-[#6C6C89] text-xs leading-4 mt-2'>MP3, WAVE up to 60 MB. 3 tracks max.</p>

            <div className='w-full mt-4'>
                {
                    !files.length ?
                        <div className='w-full py-2 flex items-center justify-between border-y-[1px] border-[#6C6C89] border-dashed'>
                            <div className='flex items-center gap-1'>
                                <Image
                                    src="/quantumDrift.png"
                                    alt="Quantum Drift"
                                    width={24}
                                    height={24}
                                    priority
                                />
                                <p className='text-sm leading-5 font-bold'>Quantum Drift</p>
                            </div>

                            <button className='hover:cursor-pointer'>
                                <X size={16} strokeWidth={3} />
                            </button>
                        </div>
                        :
                        files.map(file =>
                            <div key={file.name} className={`w-full py-2 flex items-center justify-between ${files.indexOf(file) > 0 ? "border-b-[1px]" : "border-y-[1px]"} border-[#6C6C89] border-dashed`}>
                                <div className='flex items-center gap-1'>
                                    <Image
                                        src="/quantumDrift.png"
                                        alt="Quantum Drift"
                                        width={24}
                                        height={24}
                                        priority
                                    />
                                    <p className='text-sm leading-5 font-bold'>{file.name}</p>
                                </div>

                                <button disabled={filesSubmitted} onClick={() =>
                                    setFiles((prevFiles) => prevFiles.filter((f) => f.name !== file.name))
                                } className='hover:cursor-pointer'>
                                    <X size={16} strokeWidth={3} />
                                </button>
                            </div>)
                }
            </div>

            <div className={`${message ? "block" : "hidden"} w-full my-4`}>
                <p className='text-sm leading-5 text-[#121217]'>{message}</p>
            </div>

            <div className={`${filesSubmitted ? "hidden" : "block"} w-full ${!message ? "mt-4" : "mt-0"}`}>
                <MessageModal message={message} setMessage={setMessage} />
            </div>

            <div className={filesSubmitted ? "hidden" : "block"}>
                <input
                    onClick={() => {
                        if (files.length) {
                            setInputDisabled(true);
                            handleSend()
                        }
                    }}
                    disabled={inputDisabled}
                    accept=".mp3,.wav"
                    multiple
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={handleFileChange}
                />
                <label htmlFor='file-upload' className='hover:cursor-pointer w-fit bg-[#273AF4] mt-6 px-4 py-1 rounded-sm text-white font-bold text-xs leading-4'>{files.length ? "Submit" : "Add"} tracks</label>
            </div>

            {error && <p className='text-xs text-red-500 font-medium mt-5'>{error}</p>}
        </div>
    )
}

export default ProducerCard