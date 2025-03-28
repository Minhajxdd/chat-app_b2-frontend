import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal, PortalModule } from '@angular/cdk/portal';
import {
  Component,
  DestroyRef,
  input,
  OnChanges,
  output,
  ViewChild,
} from '@angular/core';
import { RequestService } from './requests.service';
import { Requests } from './requests.types';

@Component({
  selector: 'app-requests-modal',
  imports: [PortalModule],
  templateUrl: './requests-modal.component.html',
  styleUrl: './requests-modal.component.css',
})
export class RequestsModalComponent implements OnChanges {
  isModalOpen = input.required<boolean>();
  emitCloseModal = output();

  requests: Requests[] = [];

  ngOnChanges(): void {
    if (this.isModalOpen() === true) {
      this.openModal();
      this.fetchRequests();
    }
  }

  constructor(
    private overlay: Overlay,
    private readonly _requestService: RequestService,
    private readonly _destoryRef: DestroyRef
  ) {}

  fetchRequests() {
    const subscription = this._requestService.getRequests().subscribe({
      next: (data) => {
        this.requests = data.data;
      },
    });

    this._destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onRequestActions(action: string, requestId: string) {
    const data = {
      action: action,
      requestId: requestId,
    };

    const subscription = this._requestService
      .sentRequestActions(data)
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        complete: () => {
          this.requests = this.requests.filter((request) => {
            request._id !== data.requestId;
          });
        },
      });

    this._destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

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
