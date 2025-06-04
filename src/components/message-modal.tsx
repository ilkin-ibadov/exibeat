"use client"

import {
    Dialog,
    DialogContent,
    DialogClose,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useState } from "react";

interface MessageModalProps {
    message: string;
    setMessage: (message: string) => void;
}

const MessageModal = ({ message, setMessage }: MessageModalProps) => {
    const [textValue, setTextValue] = useState("")

    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <button className='hover:cursor-pointer text-xs leading-4 font-medium underline text-[#121217]'>{message ? "Edit" : "Add"} message</button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[336px]">
                    <DialogHeader>
                        <DialogTitle className="text-2xl leading-8 font-semibold text-center">ADD MESSAGE</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-1">
                        <Label htmlFor="message" className="text-[#121217] text-xs leading-4 font-normal">Message</Label>
                        <Textarea defaultValue={message} onChange={(e) => {
                            setTextValue(e.target.value)
                        }} id="message" name="message" />
                    </div>

                    <DialogClose asChild>
                        <button onClick={() => {
                            setMessage(textValue)
                        }} className="bg-[#273AF4] w-full text-sm text-white leading-5 font-bold py-2 hover:cursor-pointer rounded-sm" type="submit">{message ? "Save" : "Add"}</button>
                    </DialogClose>
                </DialogContent>
            </form>
        </Dialog>
    )
}

export default MessageModal