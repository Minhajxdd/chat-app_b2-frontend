import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal, PortalModule } from '@angular/cdk/portal';
import { Component, input, OnChanges, output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-create-group-modal',
  imports: [PortalModule],
  templateUrl: './create-group-modal.component.html',
  styleUrl: './create-group-modal.component.css',
})
export class CreateGroupModalComponent implements OnChanges {
  isModalOpen = input.required<boolean>();

  emitCloseModal = output();

  ngOnChanges(): void {
    setTimeout(() => {
      if (this.isModalOpen() === true) {
        this.openModal();
      }
    },500);
  }

  constructor(private overlay: Overlay) {}

  // related to modal
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
    this.overlayRef.backdropClick().subscribe(() => this.closeModal());
  }

  closeModal() {
    this.overlayRef.detach();
    this.emitCloseModal.emit();
  }
}
