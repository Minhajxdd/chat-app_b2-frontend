import {
  AfterViewInit,
  Component,
  DestroyRef,
  input,
  output,
} from '@angular/core';
import { MsgReceiveBoxComponent } from './msg-receive-box/msg-receive-box.component';
import { MsgSentBoxComponent } from './msg-sent-box/msg-sent-box.component';
import { ChatSocketService } from '../../../../services/chat-socket.service';
import { UserState } from '../../../../../../shared/state/User/user.state';
import { ChatMessageModel } from './chat-body.type';
import { ChatInputDataService } from '../chat-input-box/chat-input-data.service';
import { ChatBodyService } from './chat-body.service';
import { ChatSelectedConversationService } from '../../../../services/chat-selected-conversation.service';
import { ChatEventService } from '../chat-event.service';

@Component({
  selector: '[app-chat-body]',
  imports: [MsgReceiveBoxComponent, MsgSentBoxComponent],
  templateUrl: './chat-body.component.html',
  styleUrl: './chat-body.component.css',
})
export class ChatBodyComponent {
  messageTrigger = output();

  isSelected = input.required<boolean>();
  userId: string = '';

  existingMessages: ChatMessageModel[] = [];

  receivedMessages: ChatMessageModel[] = [];

  conversationId: string = '';

  constructor(
    private readonly _chatSocketService: ChatSocketService,
    private readonly _destoryRef: DestroyRef,
    private readonly _userState: UserState,
    private readonly _chatInputDataService: ChatInputDataService,
    private readonly _chatBodyService: ChatBodyService,
    private readonly _chatSelectedConversationService: ChatSelectedConversationService,
    private readonly _chatEventService: ChatEventService
  ) {
    this.subscribeToMessage();
    this.subscribeToInputMessages();
    this.getUserId();
    this.subscribeToSelectedUsers();
    this.subscribeOnTopScrollEvent();
  }

  fetchMessages() {
    const subscription = this._chatBodyService
      .fetchChats(this.conversationId, this.existingMessages[0]?._id ?? null)
      .subscribe({
        next: (data) => {
          this.existingMessages = [...data.data, ...this.existingMessages];
        },
      });

    this._destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  subscribeToMessage() {
    const subscription = this._chatSocketService.on('message').subscribe({
      next: (data: { data: ChatMessageModel }) => {
        this.receivedMessages.push(data.data);

        this.messageTrigger.emit();
      },
    });
    this._destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  subscribeOnTopScrollEvent() {
    const subscription = this._chatEventService.scrollToTop$.subscribe(() => {

      if(this.existingMessages.length === 10) {
        this.fetchMessages();
      }
    });

    this._destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }

  subscribeToInputMessages() {
    const subscription = this._chatInputDataService.message$.subscribe(
      (data) => {
        this.receivedMessages.push(data);
      }
    );

    this._destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  getUserId() {
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
          this.conversationId = data.conversation[0]._id;

          this.existingMessages = [];

          this.receivedMessages = [];

          this.fetchMessages();
        }
      });

    this._destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
