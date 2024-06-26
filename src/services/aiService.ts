import { ISendMessageToAI } from "./types";
import { apiAI } from "./api";

export function sendMessageToAI(message: ISendMessageToAI) {
    return apiAI.post('/chat/messages', message)
}