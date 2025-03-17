import { Component, inject, input, signal } from '@angular/core';
import { OpenChatButtonService } from './open-chat-button.service';

@Component({
  selector: 'app-open-chat-button',
  imports: [],
  templateUrl: './open-chat-button.component.html',
  styleUrl: './open-chat-button.component.css',
})
export class OpenChatButtonComponent {
  private readonly _openChatButtonService = inject(OpenChatButtonService);

  isLoading = signal(false);

  userId = input.required<string>();

  checkConversationStatus() {
    this.isLoading.set(true);

    const subscription = this._openChatButtonService
      .checkForConversation(this.userId())
      .subscribe({
        next: (data) => {
          if (!data.data.length) {
          }

          console.log(data);
        },
        error: (err) => {
          console.log('error from open chat button');
          console.log(err);
        },
        complete: () => {
          this.isLoading.set(false);
        },
      });
  }
}
