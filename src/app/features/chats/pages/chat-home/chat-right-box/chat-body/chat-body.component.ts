import { Component, DestroyRef, input } from '@angular/core';
import { MsgReceiveBoxComponent } from './msg-receive-box/msg-receive-box.component';
import { MsgSentBoxComponent } from './msg-sent-box/msg-sent-box.component';
import { ChatSocketService } from '../../../../services/chat-socket.service';

@Component({
  selector: '[app-chat-body]',
  imports: [MsgReceiveBoxComponent, MsgSentBoxComponent],
  templateUrl: './chat-body.component.html',
  styleUrl: './chat-body.component.css',
})
export class ChatBodyComponent {
  isSelected = input.required<boolean>();

  constructor(
    private readonly _chatSocketService: ChatSocketService,
    private readonly _destoryRef: DestroyRef
  ) {
    this.subscribeToMessage();
  }

  subscribeToMessage() {
    console.log('these are some test log to check the subscriptiongs of the state')
    const subscription = this._chatSocketService.on('message').subscribe({
      next: (data) => {
        console.log('message recived from');
        console.log(data);
      },
    });

    this._destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
