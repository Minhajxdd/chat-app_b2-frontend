import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgSentBoxComponent } from './msg-sent-box.component';

describe('MsgSentBoxComponent', () => {
  let component: MsgSentBoxComponent;
  let fixture: ComponentFixture<MsgSentBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MsgSentBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MsgSentBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
