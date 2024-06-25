import axios from "axios";
import { ISendMessageToAI } from "./types";

export function sendMessageToAI(message: ISendMessageToAI) {
    return axios.post('https://cognia-api.otimiza.ai/chat/messages', message)
}