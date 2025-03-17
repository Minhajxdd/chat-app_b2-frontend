import {
  Component,
  input,
  OnChanges,
  output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CdkPortal, PortalModule } from '@angular/cdk/portal';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';

@Component({
  selector: 'app-search-user-modal',
  imports: [PortalModule],
  templateUrl: './search-user-modal.component.html',
  styleUrl: './search-user-modal.component.css',
})
export class SearchUserModalComponent implements OnChanges {
  showModal = input.required();
  onCloseModal = output();

  constructor(private overlay: Overlay) {}

  ngOnChanges(): void {
    
    if(this.showModal() === false) {
      this.detachModal();
    } else {
      this.openModal()
    }

  }

  @ViewChild(CdkPortal) portal!: CdkPortal;

  overlayRef!: OverlayRef;

  openModal() {
    const config = new OverlayConfig({
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
      width: '60%',
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
