import { AfterViewInit, Component, DestroyRef } from '@angular/core';
import { ChatConversationsListingsService } from './chat-conversations-listings.service';
import { ChatSelectedConversationService } from '../../../services/chat-selected-conversation.service';
import { Conversations } from './chat-conversations-listings.model';
import { ChatConversationsListingsEventsService } from './chat-conversations-listsings-events.service';

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
    private readonly _chatConversationsListingsEventsService: ChatConversationsListingsEventsService,
    private readonly _destroyRef: DestroyRef
  ) {
    this.subscibeToEvent();
  }

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

  subscibeToEvent() {
    const subscription =
      this._chatConversationsListingsEventsService.event$.subscribe(() => {
        this.getConversations();
      });

    this._destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  selectConversation(data: Conversations) {
    this._chatSelectedConversationService.setConversation(data);
  }
}
