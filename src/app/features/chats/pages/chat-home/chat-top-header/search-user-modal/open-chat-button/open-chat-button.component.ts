import { Component, inject, input } from '@angular/core';
import { OpenChatButtonService } from './open-chat-button.service';

@Component({
  selector: 'app-open-chat-button',
  imports: [],
  templateUrl: './open-chat-button.component.html',
  styleUrl: './open-chat-button.component.css'
})
export class OpenChatButtonComponent {
  private readonly _openChatButtonService = inject(OpenChatButtonService);
  

  userId = input.required<string>()

  checkConversationStatus() {

    const subscription = this._openChatButtonService.checkForConversation(this.userId())
    .subscribe({
      next: (data) => {
        console.log('data from open chat button');
        console.log(data);
      },
      error: (err) => {
        console.log('error from open chat button');
        console.log(err);
      }
    })

  }

}
