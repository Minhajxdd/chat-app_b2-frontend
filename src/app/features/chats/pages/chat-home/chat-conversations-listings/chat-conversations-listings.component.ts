import { AfterViewInit, Component, DestroyRef } from '@angular/core';
import { ChatConversationsListingsService } from './chat-conversations-listings.service';
import { ChatSelectedConversationService } from '../../../services/chat-selected-conversation.service';
import { Conversations } from './chat-conversations-listings.model';

@Component({
  selector: '[app-chat-conversations-listings]',
  imports: [],
  templateUrl: './chat-conversations-listings.component.html',
  styleUrl: './chat-conversations-listings.component.css',
})
export class ChatConversationsListingsComponent implements AfterViewInit {
  conversations: Conversations[] = [];

  constructor(
    private readonly _chatSelectedConversationService: ChatSelectedConversationService,
    private readonly _chatConversationsListingsService: ChatConversationsListingsService,
    private readonly _destroyRef: DestroyRef
  ) {}

  ngAfterViewInit() {
    this.getConversations();
  }

  getConversations() {
    const subscription = this._chatConversationsListingsService
      .getConversations()
      .subscribe({
        next: (data) => {
          this.conversations = data.data;
        },
      });

    this._destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  selectConversation(data: Conversations) {
    this._chatSelectedConversationService.setConversation(data);
  }
}
