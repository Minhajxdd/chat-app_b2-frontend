import { Component, DestroyRef, inject, input, output, signal } from '@angular/core';
import { OpenChatButtonService } from './open-chat-button.service';

@Component({
  selector: 'app-open-chat-button',
  imports: [],
  templateUrl: './open-chat-button.component.html',
  styleUrl: './open-chat-button.component.css',
})
export class OpenChatButtonComponent {
  private readonly _openChatButtonService = inject(OpenChatButtonService);
  private readonly _destoryRef = inject(DestroyRef);

  onCloseModal = output();

  isLoading = signal(false);
  requestConversation = signal(false);

  requestConversationLoading = signal(false);

  userId = input.required<string>();

  checkConversationStatus() {
    if (this.requestConversation()) {
      return this.onRequestForConversation();
    }

    this.isLoading.set(true);

    const subscription = this._openChatButtonService
      .checkForConversation(this.userId())
      .subscribe({
        next: (data) => {
          console.log(`ths is the converstaion status response`);
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

    this._destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onRequestForConversation() {
    this.requestConversationLoading.set(true);

    const subscription = this._openChatButtonService
      .requestConversation(this.userId())
      .subscribe({
        next: (data) => {
          console.log(data);

          this.onCloseModal.emit();
        },
        complete: () => {
          this.requestConversationLoading.set(false);
        },
      });

    this._destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
