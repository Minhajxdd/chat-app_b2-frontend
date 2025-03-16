import { Component, inject, ViewEncapsulation } from '@angular/core';
import { ChatSocketService } from '../../services/chat-socket.service';
import { ChatRightBoxComponent } from "./chat-right-box/chat-right-box.component";

@Component({
  selector: 'app-chat-home',
  imports: [ChatRightBoxComponent],
  templateUrl: './chat-home.component.html',
  styleUrl: './chat-home.component.css',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ChatHomeComponent {
  private readonly _chatSocketService = inject(ChatSocketService);

  constructor() {
    this._chatSocketService.connect();

    this._chatSocketService.emit('enter-chats', {});
  }
}
