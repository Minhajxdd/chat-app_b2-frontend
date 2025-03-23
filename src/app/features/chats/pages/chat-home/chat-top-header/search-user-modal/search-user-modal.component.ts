import {
  Component,
  DestroyRef,
  inject,
  input,
  OnChanges,
  output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CdkPortal, PortalModule } from '@angular/cdk/portal';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { SearchUserService } from './search-user.service';
import { FormsModule } from '@angular/forms';
import { User } from './search-user.types';
import { AutocompleteUserBoxesComponent } from './autocomplete-user-boxes/autocomplete-user-boxes.component';
import { OpenChatButtonComponent } from './open-chat-button/open-chat-button.component';
import { AddUserGroupButtonComponent } from "./add-user-group-button/add-user-group-button.component";

@Component({
  selector: 'app-search-user-modal',
  imports: [
    PortalModule,
    FormsModule,
    AutocompleteUserBoxesComponent,
    OpenChatButtonComponent,
    AddUserGroupButtonComponent
],
  templateUrl: './search-user-modal.component.html',
  styleUrl: './search-user-modal.component.css',
})
export class SearchUserModalComponent implements OnChanges {
  private readonly _searchUserService = inject(SearchUserService);
  private readonly _destoryRef = inject(DestroyRef);

  forGroup = input.required<boolean>()

  constructor(private overlay: Overlay) {
    this.getSearchedData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['showModal']?.currentValue) {
      this.openModal();
    } else {
      this.detachModal();
    }
  }

  // related to search
  searchKeyword: string = '';
  usersDatas: User[] = [];

  isUserSelected = false;
  selectedUser: User | null = null;

  searchWithKeyword() {
    this.isUserSelected = false;
    this.selectedUser = null;

    this._searchUserService.searchUser(this.searchKeyword);
  }

  onClearInput() {
    this.usersDatas = [];
    this.searchKeyword = '';
    this.isUserSelected = false;
  }

  getSearchedData() {
    const subscription = this._searchUserService.getUsers().subscribe({
      next: (data) => {
        this.usersDatas = data;
      },
    });

    this._destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onUserClicked(user: User) {
    this.isUserSelected = true;
    this.selectedUser = user;

    this.usersDatas = [];

    this.searchKeyword = user.fullName;
  }

  // related to modal and stuff
  showModal = input.required();
  onCloseModal = output();

  @ViewChild(CdkPortal) portal!: CdkPortal;

  overlayRef!: OverlayRef;

  openModal() {
    const config = new OverlayConfig({
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
      width: '30%',
      hasBackdrop: true,
    });

    this.overlayRef = this.overlay.create(config);
    this.overlayRef.attach(this.portal);
    this.overlayRef.backdropClick().subscribe(() => this.detachModal());
  }

  closeModal() {
    this.onCloseModal.emit();
  }

  detachModal() {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
      this.closeModal();
    }
  }
}
