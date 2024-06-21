'use client'
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useAuthStore } from "@/zustand-store/authStore";
import Cookies from "js-cookie";

const Home = () => {
    return (
        <div className="w-full h-full flex flex-col p-7 relative items-center gap-10">
            <ScrollArea className="flex-1">

            </ScrollArea>
            <Textarea
            />
            <a className="text-grey-700 text-sm">
                Usando a plataforma você concorda com nossos <b className="text-purple-400">Termos</b> e <b className="text-purple-400">Políticas</b>.
            </a>
        </div>
    );
}

export default Home;
