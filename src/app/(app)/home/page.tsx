'use client'
import { AlertToastComponent } from "@/components/alert";
import MessageBubble from "@/components/message";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { removeIfWhitespace } from "@/lib/utils";
import { IResquestMessageHistory } from "@/services/types";
import { useAuthStore } from "@/zustand-store/authStore";
import { useChatStore } from "@/zustand-store/chatStore";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const Home = () => {
    const topRef = useRef<HTMLDivElement | null>(null)
    const endRef = useRef<HTMLDivElement | null>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const router = useRouter()
    const { user } = useAuthStore()
    const { error, getHistory, isLoading, lastMessage, messages, sendMessage, prompt, setPrompt } = useChatStore()

    const handleSendMessage = () => {
        const sessionId = user?.sessionIds?.length === 0 ? '' : user?.sessionIds[0];
        const userIdExt = user?.id;
        sendMessage(sessionId, userIdExt, prompt, scrollToBottom);
    };

    const scrollToBottom = () => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToTop = () => {
        topRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && prompt !== '') {
            handleSendMessage();
        }
    };

    function getHistoryTrigger() {
        if (user?.sessionIds && user.sessionIds.length > 0) {
            const request: IResquestMessageHistory = {
                session_id: user.sessionIds[0],
                take: 10,
                last_message_id: lastMessage?.id
            }
            getHistory(request, messages, scrollToTop)
        }
    }

    useEffect(() => {
        textareaRef?.current?.focus();
    }, [])

    useEffect(() => {
        if (user?.sessionIds && user.sessionIds.length > 0) {
            const request: IResquestMessageHistory = {
                session_id: user.sessionIds[0],
                take: 50
            }
            getHistory(request, messages, scrollToBottom)
        }
    }, [])

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    useEffect(() => {
        router.refresh()
    }, [])

    return (
        <div className="w-full h-full flex flex-col px-7 pb-7 relative items-center gap-5 max-h-screen">
            <ScrollArea id='scrollArea' className="h-full pr-3 max-w-xl w-full">
                <div className="w-full h-20 z-10 absolute top-0 bg-gradient-to-b from-white via-white-opacity-30 to-white-opacity-70" />
                {/* <div ref={topRef} /> */}
                <div className="flex flex-col items-center justify-center max-w-xl pt-8">
                    {/* <Button type='button' onClick={getHistoryTrigger} className="z-20" isLoading={isLoading} disabled={isLoading}>Carregar mais</Button> */}
                    <MessageBubble messages={messages} />
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
                onChange={(event) => setPrompt(removeIfWhitespace(event.target.value))}
                onSend={handleSendMessage}
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
