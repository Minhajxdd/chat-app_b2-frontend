import { Component, signal } from '@angular/core';
import { SearchUserModalComponent } from './search-user-modal/search-user-modal.component';
import { NgClass } from '@angular/common';
import { ThreedotDropdownComponent } from "./threedot-dropdown/threedot-dropdown.component";

@Component({
  selector: '[app-chat-top-header]',
  imports: [SearchUserModalComponent, NgClass, ThreedotDropdownComponent],
  templateUrl: './chat-top-header.component.html',
  styleUrl: './chat-top-header.component.css',
})
export class ChatTopHeaderComponent {
  showSearchModal = signal(false);
  showThreeDot = signal(false);

  onToggleSearchModal() {
    this.showSearchModal.set(!this.showSearchModal());
  }

  onToggleThreeDot() {
    this.showThreeDot.set(!this.showThreeDot());
  }
}
