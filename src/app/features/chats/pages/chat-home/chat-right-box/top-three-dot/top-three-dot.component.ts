import { Component, input, signal } from '@angular/core';
import { AddUserModalComponent } from "./add-user-modal/add-user-modal.component";
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-top-three-dot',
  imports: [AddUserModalComponent, NgClass],
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
