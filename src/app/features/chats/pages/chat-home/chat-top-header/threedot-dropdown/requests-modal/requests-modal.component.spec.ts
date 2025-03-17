import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsModalComponent } from './requests-modal.component';

describe('RequestsModalComponent', () => {
  let component: RequestsModalComponent;
  let fixture: ComponentFixture<RequestsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
