import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../../../../core/auth/service/auth.service';
import { RequestsModalComponent } from "./requests-modal/requests-modal.component";
import { CreateGroupModalComponent } from "./create-group-modal/create-group-modal.component";

@Component({
  selector: 'app-threedot-dropdown',
  imports: [RequestsModalComponent, CreateGroupModalComponent],
  templateUrl: './threedot-dropdown.component.html',
  styleUrl: './threedot-dropdown.component.css'
})
export class ThreedotDropdownComponent {
  private readonly _authservice = inject(AuthService);

  isRequestModalOpen = signal(false);

  logOut() {
    this._authservice.logout();
  }

  onToggleRequestModal() {
    this.isRequestModalOpen.set(!this.isRequestModalOpen());
  }

}
