import { IResponseMessageFromAI } from "@/services/types";
import { Label } from "../ui/label";
import { UserCircle } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface IMessageBubble {
    messages: IResponseMessageFromAI[];
}

export default function MessageBubble(props: IMessageBubble) {

    return (
        props.messages.map((response, index) => (
            <div key={index} className={cn("flex flex-row gap-4 w-full", response.sender_type === 'Assistant' ? "justify-start" : "justify-end")}>
                <div className={cn("p-2 mt-6 flex items-center justify-center rounded-full bg-beige-300 min-h-10 min-w-10 max-h-10 max-w-10", response.sender_type !== "Assistant" && 'hidden')}>
                    <Image src='/cogniia-short.svg' alt="icon" height={20} width={20} />
                </div>
                <div className={cn("rounded-2xl p-4 my-4", response.sender_type === 'Assistant' ? "bg-beige-300" : "bg-purple-50")}>
                    <Markdown remarkPlugins={[remarkGfm]} className="text-sm text-purple-700 ">{response?.text}</Markdown>
                </div>
                <div className={cn("p-2 mt-6 h-10 w-10 flex items-center justify-center bg-purple-50 rounded-full", response.sender_type === "Assistant" && 'hidden')}>
                    <UserCircle size={25} className="text-purple-700" />
                </div>
            </div>
        ))
    )
}