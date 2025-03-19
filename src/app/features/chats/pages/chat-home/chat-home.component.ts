import { Component, DestroyRef } from '@angular/core';
import { ChatSocketService } from '../../services/chat-socket.service';
import { ChatRightBoxComponent } from './chat-right-box/chat-right-box.component';
import { ChatHomeService } from './chat-home.service';
import { Conversations } from './chat-home.model';
import { ChatTopHeaderComponent } from './chat-top-header/chat-top-header.component';
import { ChatSelectedConversationService } from '../../services/chat-selected-conversation.service';
import { UserState } from '../../../../shared/state/User/user.state';

@Component({
  selector: 'app-chat-home',
  imports: [ChatRightBoxComponent, ChatTopHeaderComponent],
  templateUrl: './chat-home.component.html',
  styleUrl: './chat-home.component.css',
})
export class ChatHomeComponent {
  conversations: Conversations[] = [];

  constructor(
    private readonly _chatSocketService: ChatSocketService,
    private readonly _chatHomeService: ChatHomeService,
    private readonly _destroyRef: DestroyRef,
    private readonly _chatSelectedConversationService: ChatSelectedConversationService,
    private readonly _userState: UserState
  ) {
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
