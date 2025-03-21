import { Component } from '@angular/core';
import { ChatSocketService } from '../../services/chat-socket.service';
import { ChatRightBoxComponent } from './chat-right-box/chat-right-box.component';
import { ChatTopHeaderComponent } from './chat-top-header/chat-top-header.component';
import { ChatConversationsListingsComponent } from './chat-conversations-listings/chat-conversations-listings.component';

@Component({
  selector: 'app-chat-home',
  imports: [ChatRightBoxComponent, ChatTopHeaderComponent, ChatConversationsListingsComponent],
  templateUrl: './chat-home.component.html',
  styleUrl: './chat-home.component.css',
})
export class ChatHomeComponent {
  constructor(private readonly _chatSocketService: ChatSocketService) {
    this._chatSocketService.connect();

    this._chatSocketService.emit('enter-chats', {});
  }
}
