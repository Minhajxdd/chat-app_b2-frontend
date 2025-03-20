import {
  Component,
  DestroyRef,
  ElementRef,
  signal,
  ViewChild,
} from '@angular/core';
import { ChatSelectedConversationService } from '../../../services/chat-selected-conversation.service';
import { Conversations } from '../chat-home.model';
import { ChatInputBoxComponent } from './chat-input-box/chat-input-box.component';
import { ChatBodyComponent } from './chat-body/chat-body.component';
import { ChatEventService } from './chat-event.service';

@Component({
  selector: '[app-chat-right-box]',
  imports: [ChatInputBoxComponent, ChatBodyComponent],
  templateUrl: './chat-right-box.component.html',
  styleUrl: './chat-right-box.component.css',
})
export class ChatRightBoxComponent {
  isSelected = signal(false);
  selectedConversation!: Conversations;

  constructor(
    private readonly _chatSelectedConversationService: ChatSelectedConversationService,
    private readonly _destoryRef: DestroyRef,
    private readonly _chatEventService: ChatEventService
  ) {
    this.subscribeToSelectedUsers();
  }

  @ViewChild('scrollableDiv') scrollableDiv!: ElementRef;

  scrollChatDiv() {
    this.scrollableDiv.nativeElement.scrollTop =
      this.scrollableDiv.nativeElement.scrollHeight;
  }

  scrollChatDivOnTop(event: Event) {
    const target = event.target as HTMLElement;
    if (target.scrollTop === 0) {
      this._chatEventService.emitScrollToTop();
    }
  }


  subscribeToSelectedUsers() {
    const subscription = this._chatSelectedConversationService
      .getConversationObservable()
      .subscribe((data) => {
        if (data) {
          this.isSelected.set(true);
          this.selectedConversation = data;

          setTimeout(() => {
            this.scrollChatDiv();
          }, 200);
        }
      });

    this._destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
