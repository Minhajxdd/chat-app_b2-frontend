import { ConversationType } from "../../chat-home.model";

export interface MessageBody {
    text: string,
    conversationId: string,
    type: ConversationType,
    userId?: string;
}