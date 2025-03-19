import { ConversationType } from '../../chat-home.model';

export interface MessageBody {
  content: string;
  conversation: string;
  userId?: string;
  messageType: ConversationType;
}
