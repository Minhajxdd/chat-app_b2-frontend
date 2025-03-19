import { Component, DestroyRef, input } from '@angular/core';
import { MsgReceiveBoxComponent } from './msg-receive-box/msg-receive-box.component';
import { MsgSentBoxComponent } from './msg-sent-box/msg-sent-box.component';
import { ChatSocketService } from '../../../../services/chat-socket.service';
import { UserState } from '../../../../../../shared/state/User/user.state';
import { MessageDataModel } from './chat-body.type';
import { ChatInputDataService } from '../chat-input-box/chat-input-data.service';

@Component({
  selector: '[app-chat-body]',
  imports: [MsgReceiveBoxComponent, MsgSentBoxComponent],
  templateUrl: './chat-body.component.html',
  styleUrl: './chat-body.component.css',
})
export class ChatBodyComponent {
  isSelected = input.required<boolean>();
  userId: string = '';

  receivedMessages: MessageDataModel[] = [];

  constructor(
    private readonly _chatSocketService: ChatSocketService,
    private readonly _destoryRef: DestroyRef,
    private readonly _userState: UserState,
    private readonly _chatInputDataService: ChatInputDataService
  ) {
    this.subscribeToMessage();
    this.subscribeToInputMessages();
    this.getUserId();
  }

  subscribeToMessage() {
    const subscription = this._chatSocketService.on('message').subscribe({
      next: (data: { data: MessageDataModel }) => {
        this.receivedMessages.push(data.data);
        console.log(data.data);
      },
    });
    this._destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  subscribeToInputMessages() {
    const subscription = this._chatInputDataService.message$.subscribe(
      (data) => {
        console.log('send data');
        console.log(this.userId)
        console.log(data);
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
}
