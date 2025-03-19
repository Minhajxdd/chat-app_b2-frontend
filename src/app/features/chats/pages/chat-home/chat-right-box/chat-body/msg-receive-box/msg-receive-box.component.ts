import { Component, input } from '@angular/core';
import { MessageDataModel } from '../chat-body.type';
import { DatePipe } from '@angular/common';

@Component({
  selector: '[app-msg-receive-box]',
  imports: [DatePipe],
  templateUrl: './msg-receive-box.component.html',
  styleUrl: './msg-receive-box.component.css'
})
export class MsgReceiveBoxComponent {
  message = input.required<MessageDataModel>();

}
