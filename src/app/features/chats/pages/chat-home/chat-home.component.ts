import {
  Component,
  DestroyRef,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { ChatSocketService } from '../../services/chat-socket.service';
import { ChatRightBoxComponent } from './chat-right-box/chat-right-box.component';
import { ChatHomeService } from './chat-home.service';
import { Conversations } from './chat-home.model';
import { ChatTopHeaderComponent } from './chat-top-header/chat-top-header.component';
import { ChatSelectedConversationService } from '../../services/chat-selected-conversation.service';

@Component({
  selector: 'app-chat-home',
  imports: [ChatRightBoxComponent, ChatTopHeaderComponent],
  templateUrl: './chat-home.component.html',
  styleUrl: './chat-home.component.css',
})
export class ChatHomeComponent {
  private readonly _chatSocketService = inject(ChatSocketService);
  private readonly _chatHomeService = inject(ChatHomeService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _chatSelectedConversationService = inject(
    ChatSelectedConversationService
  );

  conversations: Conversations[] = [];

  constructor() {
    this._chatSocketService.connect();

    this._chatSocketService.emit('enter-chats', {});

    this.getUsers();
  }

  selectConversation(data: Conversations) {
    this._chatSelectedConversationService.setConversation(data);
  }


  getUsers() {
    const subscription = this._chatHomeService.getUsers().subscribe({
      next: (data) => {
        console.log(data);
        this.conversations = data.data;
      },
    });

    this._destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
