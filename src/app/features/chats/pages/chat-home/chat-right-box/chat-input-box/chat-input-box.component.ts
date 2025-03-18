import { Component, DestroyRef } from '@angular/core';
import { ChatSocketService } from '../../../../services/chat-socket.service';
import { FormsModule } from '@angular/forms';
import { ChatSelectedConversationService } from '../../../../services/chat-selected-conversation.service';
import { Conversations } from '../../chat-home.model';
import { MessageBody } from './chat.type';

@Component({
  selector: '[app-chat-input-box]',
  imports: [FormsModule],
  templateUrl: './chat-input-box.component.html',
  styleUrl: './chat-input-box.component.css',
})
export class ChatInputBoxComponent {
  textInput: string = '';

  selectedConversation!: Conversations;

  constructor(
    private readonly _chatSocketService: ChatSocketService,
    private readonly _chatSelectedConversationService: ChatSelectedConversationService,
    private readonly _destoryRef: DestroyRef
  ) {
    this.subscribeToSelectedUsers();
  }

  sendMessage() {
    const text = this.textInput;
    this.textInput = '';

    if (text) {
      let data: MessageBody = {
        text,
        conversationId: this.selectedConversation.conversation[0]._id,
        type: this.selectedConversation.conversation[0].type,
      };

      if (data.type === 'single') {
        data.userId = this.selectedConversation.users[0]._id;
      }

      this._chatSocketService.emit('message', data);
    }
  }

  subscribeToSelectedUsers() {
    const subscription = this._chatSelectedConversationService
      .getConversationObservable()
      .subscribe((data) => {
        if (data) {
          this.selectedConversation = data;
        }
      });

    this._destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
