import { Component, ElementRef, input, output } from '@angular/core';
import { User } from '../search-user.types';

@Component({
  selector: 'app-autocomplete-user-boxes',
  imports: [],
  templateUrl: './autocomplete-user-boxes.component.html',
  styleUrl: './autocomplete-user-boxes.component.css',
})
export class AutocompleteUserBoxesComponent {
  constructor(private ele: ElementRef) {}

  user = input.required<User>();
  onClick = output<User>();

  onClickBox() {
    this.onClick.emit(this.user());
    this.ele.nativeElement.remove();
  }
}
