import { Component, DestroyRef, inject, ViewEncapsulation } from '@angular/core';
import { ChatSocketService } from '../../services/chat-socket.service';
import { ChatRightBoxComponent } from "./chat-right-box/chat-right-box.component";
import { ChatHomeService } from './chat-home.service';
import { Users } from './chat-home.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-chat-home',
  imports: [ChatRightBoxComponent, RouterLink],
  templateUrl: './chat-home.component.html',
  styleUrl: './chat-home.component.css',
})
export class ChatHomeComponent {
  private readonly _chatSocketService = inject(ChatSocketService);
  private readonly _chatHomeService = inject(ChatHomeService);
  private readonly _destroyRef = inject(DestroyRef);

  users: Users[] = [];

  constructor() {
    this._chatSocketService.connect();

    this._chatSocketService.emit('enter-chats', {});

    const subscription = this._chatHomeService.getUsers()
    .subscribe({
      next: (data) => {
        this.users = data.data;
      }
    });

    this._destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })

  }
}
