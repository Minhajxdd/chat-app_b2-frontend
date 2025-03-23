import { Component, DestroyRef, input, output, signal } from '@angular/core';
import { AddUserGroupButtonService } from './add-user-group-button.service';
import { ChatSelectedConversationService } from '../../../../../services/chat-selected-conversation.service';

@Component({
  selector: 'app-add-user-group-button',
  imports: [],
  templateUrl: './add-user-group-button.component.html',
  styleUrl: './add-user-group-button.component.css',
})
export class AddUserGroupButtonComponent {
  constructor(
    private readonly _addUserGroupButtonService: AddUserGroupButtonService,
    private readonly _destroyRef: DestroyRef,
    private readonly _chatSelectedConversationService: ChatSelectedConversationService
  ) {
    this.getSelectedConversationId();
  }

  onCloseModal = output();

  isLoading = signal(false);
  requestConversation = signal(false);

  requestConversationLoading = signal(false);

  userId = input.required<string>();
  conversationId = '';

  getSelectedConversationId() {
    const subscription = this._chatSelectedConversationService
      .getConversationObservable()
      .subscribe((data) => {
        if (data) this.conversationId = data?.conversation[0]._id;
      });

      this._destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      })
  }

  checkConversationStatus() {
    if (this.requestConversation()) {
      return this.onRequestForConversation();
    }

    this.isLoading.set(true);

    console.log({
      userId: this.userId(),
      conversatoin: this.conversationId
    }, ' : these are conversations details');

    const subscription = this._addUserGroupButtonService
      .checkForConversation(this.userId(), this.conversationId)
      .subscribe({
        next: (data) => {
          console.log(`ths is the converstaion status response of group`);
          console.log(data);

          if (!data.data.length) {
            this.requestConversation.set(true);
          } else {
            // Implement redirect to conversation feature
          }
        },
        error: (err) => {
          console.log('error from open chat button');
          console.log(err);
        },
        complete: () => {
          this.isLoading.set(false);
        },
      });

    this._destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onRequestForConversation() {
    this.requestConversationLoading.set(true);

    console.log('requesting....');

    // const subscription = this._openChatButtonService
    //   .requestConversation(this.userId())
    //   .subscribe({
    //     next: (data) => {
    //       console.log(data);

    //       this.onCloseModal.emit();
    //     },
    //     complete: () => {
    //       this.requestConversationLoading.set(false);
    //     },
    //   });

    // this._destoryRef.onDestroy(() => {
    //   subscription.unsubscribe();
    // });
  }
}
