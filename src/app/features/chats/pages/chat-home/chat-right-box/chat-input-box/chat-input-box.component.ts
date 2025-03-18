import { Component } from '@angular/core';
import { ChatSocketService } from '../../../../services/chat-socket.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: '[app-chat-input-box]',
  imports: [FormsModule],
  templateUrl: './chat-input-box.component.html',
  styleUrl: './chat-input-box.component.css',
})
export class ChatInputBoxComponent {
  textInput: string = '';
  
  constructor(private readonly _chatSocketService: ChatSocketService) {}

  sendMessage() {
    const text = this.textInput;
    this.textInput = '';

    if(text) {
      console.log(text);

    }


  }

}
