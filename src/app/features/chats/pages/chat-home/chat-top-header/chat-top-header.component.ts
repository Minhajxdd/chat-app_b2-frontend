import { Component, signal } from '@angular/core';
import { SearchUserModalComponent } from "./search-user-modal/search-user-modal.component";

@Component({
  selector: '[app-chat-top-header]',
  imports: [SearchUserModalComponent],
  templateUrl: './chat-top-header.component.html',
  styleUrl: './chat-top-header.component.css'
})
export class ChatTopHeaderComponent {
  showSearchModal = signal(false);

  onToggleSearchModal() {
    this.showSearchModal.set(!this.showSearchModal());
  }

}
