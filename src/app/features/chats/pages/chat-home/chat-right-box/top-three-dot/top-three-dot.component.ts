import { Component, input, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { SearchUserModalComponent } from "../../chat-top-header/search-user-modal/search-user-modal.component";

@Component({
  selector: 'app-top-three-dot',
  imports: [NgClass, SearchUserModalComponent],
  templateUrl: './top-three-dot.component.html',
  styleUrl: './top-three-dot.component.css'
})
export class TopThreeDotComponent {
  chatType = input.required<string>();
  isToggled = input.required<boolean>();

  isAddUserToggled = signal(false);

  toggleIsAddUserToggled() {
    
    this.isAddUserToggled.set(!this.isAddUserToggled());
  }

}
