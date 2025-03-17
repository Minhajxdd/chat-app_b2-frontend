import { Component, input } from '@angular/core';

@Component({
  selector: 'app-open-chat-button',
  imports: [],
  templateUrl: './open-chat-button.component.html',
  styleUrl: './open-chat-button.component.css'
})
export class OpenChatButtonComponent {
  userId = input.required<string>()

  checkConversationStatus() {
    console.log(this.userId())
  }

}
