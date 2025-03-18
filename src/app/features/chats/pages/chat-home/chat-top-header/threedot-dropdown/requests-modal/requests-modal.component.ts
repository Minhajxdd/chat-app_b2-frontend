import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal, PortalModule } from '@angular/cdk/portal';
import {
  AfterViewInit,
  Component,
  DestroyRef,
  inject,
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
export class RequestsModalComponent implements AfterViewInit {
  requests: Requests[] = [];

  constructor(
    private overlay: Overlay,
    private readonly _requestService: RequestService,
    private readonly _destoryRef: DestroyRef
  ) {
    setTimeout(() => {
      this.openModal();
    }, 50);
  }

  ngAfterViewInit(): void {
    this.fetchRequests();
  }

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
    this.overlayRef.backdropClick().subscribe(() => this.overlayRef.detach());
  }

  closeModal() {
    this.overlayRef.detach();
  }
}
