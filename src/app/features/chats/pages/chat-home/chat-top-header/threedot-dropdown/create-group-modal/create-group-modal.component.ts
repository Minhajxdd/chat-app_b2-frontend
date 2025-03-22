import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal, PortalModule } from '@angular/cdk/portal';
import {
  Component,
  input,
  OnChanges,
  OnInit,
  output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
    setTimeout(() => {
      if (this.isModalOpen() === true) {
        this.openModal();
      }
    }, 500);
  }

  constructor(private overlay: Overlay, private fb: FormBuilder) {}

  onSubmit(): void {
    if (this.groupForm.valid) {
      console.log('Form Submitted Successfully!', this.groupForm.value);
    } else {
      console.log('Form is not valid!');
      this.groupForm.markAllAsTouched();
    }
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
