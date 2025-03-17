import { Component, input } from '@angular/core';
import { User } from '../search-user.types';

@Component({
  selector: 'app-autocomplete-user-boxes',
  imports: [],
  templateUrl: './autocomplete-user-boxes.component.html',
  styleUrl: './autocomplete-user-boxes.component.css'
})
export class AutocompleteUserBoxesComponent {
  user = input.required<User>();
}
