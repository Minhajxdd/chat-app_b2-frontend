import { Component } from '@angular/core';
import { MsgReceiveBoxComponent } from './msg-receive-box/msg-receive-box.component';
import { MsgSentBoxComponent } from './msg-sent-box/msg-sent-box.component';

@Component({
  selector: '[app-chat-body]',
  imports: [MsgReceiveBoxComponent, MsgSentBoxComponent],
  templateUrl: './chat-body.component.html',
  styleUrl: './chat-body.component.css'
})
export class ChatBodyComponent {

}
