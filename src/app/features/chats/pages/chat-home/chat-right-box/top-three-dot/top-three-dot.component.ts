import { Component, input } from '@angular/core';

@Component({
  selector: 'app-top-three-dot',
  imports: [],
  templateUrl: './top-three-dot.component.html',
  styleUrl: './top-three-dot.component.css'
})
export class TopThreeDotComponent {
  chatType = input.required<string>();
}
