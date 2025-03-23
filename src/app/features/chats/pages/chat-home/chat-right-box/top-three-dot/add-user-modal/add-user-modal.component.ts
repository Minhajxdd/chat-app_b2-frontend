import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import {  CdkPortal, PortalModule } from '@angular/cdk/portal';
import { Component, input, output, ViewChild,} from '@angular/core';

@Component({
  selector: 'app-add-user-modal',
  imports: [PortalModule],
  templateUrl: './add-user-modal.component.html',
  styleUrl: './add-user-modal.component.css'
})
export class AddUserModalComponent {
  isModalOpen = input.required<boolean>();
  emitCloseModal = output();

  ngOnChanges(): void {
    setTimeout(() => {
      if (this.isModalOpen() === true) {
        this.openModal();
      }
      
    }, 100);
  }
  
  constructor(private overlay: Overlay) {}

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
