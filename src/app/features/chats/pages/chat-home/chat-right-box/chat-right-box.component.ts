import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: '[app-chat-right-box]',
  imports: [],
  templateUrl: './chat-right-box.component.html',
  styleUrl: './chat-right-box.component.css'
})
export class ChatRightBoxComponent {
  private readonly _activatedRoute = inject(ActivatedRoute);
  chatId: string = '';
  constructor() {
    this._activatedRoute.queryParams.subscribe((data) => {
      this.chatId = data['id'];
    })
  }
}
