import { Component } from '@angular/core';
import { MsgReceiveBoxComponent } from './msg-receive-box/msg-receive-box.component';

@Component({
  selector: '[app-chat-body]',
  imports: [MsgReceiveBoxComponent],
  templateUrl: './chat-body.component.html',
  styleUrl: './chat-body.component.css'
})
export class ChatBodyComponent {

}
