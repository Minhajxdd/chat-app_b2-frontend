import { Component, input } from '@angular/core';
import { MessageDataModel } from '../chat-body.type';
import { DatePipe } from '@angular/common';

@Component({
  selector: '[app-msg-sent-box]',
  imports: [DatePipe],
  templateUrl: './msg-sent-box.component.html',
  styleUrl: './msg-sent-box.component.css'
})
export class MsgSentBoxComponent {
  message = input.required<MessageDataModel>();
}
