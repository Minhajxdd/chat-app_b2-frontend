import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal, PortalModule } from '@angular/cdk/portal';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-requests-modal',
  imports: [PortalModule],
  templateUrl: './requests-modal.component.html',
  styleUrl: './requests-modal.component.css'
})
export class RequestsModalComponent {

  constructor(private overlay: Overlay) {
    setTimeout(() => {
      this.openModal();
    },50);
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
