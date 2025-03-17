import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../../../core/auth/service/auth.service';

@Component({
  selector: 'app-threedot-dropdown',
  imports: [],
  templateUrl: './threedot-dropdown.component.html',
  styleUrl: './threedot-dropdown.component.css'
})
export class ThreedotDropdownComponent {
  private readonly _authservice = inject(AuthService);

  logOut() {
    this._authservice.logout();
  }

}
