import { Component, signal } from '@angular/core';
import { ChatSelectedConversationService } from '../../../services/chat-selected-conversation.service';
import { Conversations } from '../chat-home.model';

@Component({
  selector: '[app-chat-right-box]',
  imports: [],
  templateUrl: './chat-right-box.component.html',
  styleUrl: './chat-right-box.component.css',
})
export class ChatRightBoxComponent {
  isSelected = signal(false);
  selectedConversation!: Conversations;

  constructor(
    private readonly _chatSelectedConversationService: ChatSelectedConversationService
  ) {
    this.subscribeToSelectedUsers();
  }

  subscribeToSelectedUsers() {
    const subscription = this._chatSelectedConversationService
      .getConversationObservable()
      .subscribe((data) => {
        if (data) {
          this.isSelected.set(true);
          this.selectedConversation = data;
        }
      });
  }
}
