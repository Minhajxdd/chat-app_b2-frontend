import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal, PortalModule } from '@angular/cdk/portal';
import {
  Component,
  DestroyRef,
  input,
  OnChanges,
  OnInit,
  output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CreateGroupModalService } from './create-group-modal.service';
import { ChatConversationsListingsEventsService } from '../../../chat-conversations-listings/chat-conversations-listsings-events.service';

@Component({
  selector: 'app-create-group-modal',
  imports: [PortalModule, ReactiveFormsModule],
  templateUrl: './create-group-modal.component.html',
  styleUrl: './create-group-modal.component.css',
})
export class CreateGroupModalComponent implements OnChanges, OnInit {
  isModalOpen = input.required<boolean>();
  emitCloseModal = output();

  groupForm!: FormGroup;

  ngOnInit(): void {
    this.groupForm = this.fb.group({
      groupTitle: ['', Validators.required],
      groupDescription: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnChanges(): void {
    if (this.isModalOpen() === true) {
      this.openModal();
    }
  }

  constructor(
    private overlay: Overlay,
    private fb: FormBuilder,
    private readonly _createGroupModalService: CreateGroupModalService,
    private readonly _chatConversationsListingsEventsService: ChatConversationsListingsEventsService,
    private readonly _destoryRef: DestroyRef
  ) {}

  onSubmit(): void {
    if (this.groupForm.valid) {
      this.submitData();
    } else {
      console.log('Form is not valid!');
      this.groupForm.markAllAsTouched();
    }
  }

  serverFormErrorMessage: string = '';

  submitData(): void {
    const title = this.groupForm.value.groupTitle;
    const descripton = this.groupForm.value.groupDescription;

    const subscription = this._createGroupModalService
      .createGroup(title, descripton)
      .subscribe({
        next: (data) => {
          console.log(`this is the subscribed data`);
          console.log(data);
        },
        error: (err) => {
          this.serverFormErrorMessage = err;
        },
        complete: () => {
          this.closeModal();
          this._chatConversationsListingsEventsService.emitEvent(null);
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
