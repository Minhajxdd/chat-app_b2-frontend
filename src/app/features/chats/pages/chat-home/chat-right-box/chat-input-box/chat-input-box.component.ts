import { Component, DestroyRef } from '@angular/core';
import { ChatSocketService } from '../../../../services/chat-socket.service';
import { FormsModule } from '@angular/forms';
import { ChatSelectedConversationService } from '../../../../services/chat-selected-conversation.service';
import { Conversations } from '../../chat-home.model';
import { MessageBody } from './chat.type';
import { ChatInputDataService } from './chat-input-data.service';
import { UserState } from '../../../../../../shared/state/User/user.state';

@Component({
  selector: '[app-chat-input-box]',
  imports: [FormsModule],
  templateUrl: './chat-input-box.component.html',
  styleUrl: './chat-input-box.component.css',
})
export class ChatInputBoxComponent {
  textInput: string = '';
  userId: string = '';

  selectedConversation!: Conversations;

  constructor(
    private readonly _chatSocketService: ChatSocketService,
    private readonly _chatSelectedConversationService: ChatSelectedConversationService,
    private readonly _destoryRef: DestroyRef,
    private readonly _chatInputDataService: ChatInputDataService,
    private readonly _userState: UserState
  ) {
    this.subscribeToSelectedUsers();
    this.subscribeToUserState();
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

      this._chatInputDataService.sendMessage({
        sender: this.userId,
        conversation: data.conversationId,
        text: text,
        time: String(new Date()),
      });

      this._chatSocketService.emit('message', data);
    }
  }

  subscribeToUserState() {
    const subscription = this._userState.getData('_id').subscribe((data) => {
      if (data) this.userId = data;
    });

    this._destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });
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
