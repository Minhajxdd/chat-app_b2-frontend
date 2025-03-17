import { Component, ViewChild } from '@angular/core';
import { CdkPortal, PortalModule } from '@angular/cdk/portal';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';

@Component({
  selector: 'app-search-user-modal',
  imports: [PortalModule],
  templateUrl: './search-user-modal.component.html',
  styleUrl: './search-user-modal.component.css',
})
export class SearchUserModalComponent {
  constructor(private overlay: Overlay) {
    setTimeout(() => {
      
      this.openModal();
    }, 1000);
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
    this.overlayRef.backdropClick().subscribe(() => this.overlayRef.detach());
  }

  closeModal() {
    this.overlayRef.detach();
  }
}
