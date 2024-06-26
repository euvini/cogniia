'use client'
import { AlertToastComponent } from "@/components/alert";
import MessageBubble from "@/components/message";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { sendMessageToAI } from "@/services/aiService";
import { IResponseMessageFromAI } from "@/services/types";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const Home = () => {
    const endRef = useRef<HTMLDivElement | null>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [prompt, setPrompt] = useState<string>('')
    const [aiResponse, setAiResponse] = useState<IResponseMessageFromAI[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    async function handleSendPrompt() {
        setIsLoading(true);
        setError(false);
        setAiResponse(prev => [
            ...prev,
            {
                sender_type: 'User',
                session_id: "4edfa0b9-0e36-46e9-aab3-c4628561051e",
                user_id_ext: '5',
                text: prompt
            }
        ]);

        try {
            const response = await sendMessageToAI({
                create_session: false,
                session_id: "4edfa0b9-0e36-46e9-aab3-c4628561051e", // alterar depois
                user_id_ext: "5", // alterar depois
                text: prompt,
                sender_type: "user"
            });

            const ai = response?.data;
            setAiResponse(prev => [...prev, ai]);
            setPrompt('');
        } catch (e) {
            const messages = aiResponse.slice(0, -1);
            setAiResponse(messages);
            setError(true);
            console.log(e);
        } finally {
            setIsLoading(false);
            textareaRef.current?.focus();
        }
    }

    const scrollToBottom = () => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && prompt !== '') {
            handleSendPrompt();
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [aiResponse])

    useEffect(() => {
        textareaRef?.current?.focus();
    }, [])

    return (
        <div className="w-full h-full flex flex-col px-7 pb-7 relative items-center gap-5 max-h-screen">
            <ScrollArea id='scrollArea' className="h-full pr-3 max-w-xl w-full">
                <div className="w-full h-20 z-10 absolute top-0 bg-gradient-to-b from-white via-white-opacity-30 to-white-opacity-70" />
                <div className="flex flex-col items-center justify-center max-w-xl pt-8">
                    <MessageBubble messages={aiResponse} />
                    {
                        isLoading && (
                            <div className="mt-3 flex items-center self-start gap-3">
                                <span className="text-grey-700 text-sm">Analisando... </span>
                                <Sparkles size={25} className="text-purple-300" />
                            </div>
                        )
                    }
                    {
                        error && (
                            <AlertToastComponent helperText={'Ocorreu um erro ao tentar enviar a mensagem, mas você pode tentar novamente.'} />
                        )
                    }
                </div>
                <div ref={endRef} />
            </ScrollArea>
            <Textarea
                ref={textareaRef}
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                onSend={handleSendPrompt}
                disabled={isLoading}
                onKeyDown={handleKeyDown}
            />
            <a className="text-grey-700 text-sm">
                Usando a plataforma você concorda com nossos
                <b className="text-purple-400 hover:cursor-pointer">
                    <Link href={'/service-terms'}>
                        {' '}Termos
                    </Link>
                </b>
                {' '}e
                <b className="text-purple-400">
                    <Link href={'/privacy-terms'}>
                        {' '}Políticas
                    </Link>
                </b>.
            </a>
        </div>
    );
}

export default Home;
