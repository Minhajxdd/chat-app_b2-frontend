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

@Component({
  selector: 'app-search-user-modal',
  imports: [PortalModule, FormsModule],
  templateUrl: './search-user-modal.component.html',
  styleUrl: './search-user-modal.component.css',
})
export class SearchUserModalComponent implements OnChanges {
  private readonly _searchUserService = inject(SearchUserService);
  private readonly _destoryRef = inject(DestroyRef);


  constructor(private overlay: Overlay) {
    setTimeout(() => {
      this.openModal();
    }, 100)

    this.getSearchedData();
  }

  ngOnChanges(): void {
    if(this.showModal() === false) {
      this.detachModal();
    } else {
      this.openModal()
    }
  }

  // related to search
  searchKeyword: string = '';
  usersDatas: User[] = [];

  searchWithKeyword() {
    console.log(this.searchKeyword);
    this._searchUserService.searchUser(this.searchKeyword);
  }

  onClearInput() {
    this.searchKeyword = '';
  }

  getSearchedData() {
    const subscription = this._searchUserService.getUsers()
    .subscribe({
      next: (data) => {
        this.usersDatas = data;
      }
    });

    this._destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    })
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
    this.overlayRef.backdropClick().subscribe(() => this.closeModal());
  }

  closeModal() {
    this.onCloseModal.emit();
    
  }

  detachModal() {
    this.overlayRef?.detach();
  }
}
