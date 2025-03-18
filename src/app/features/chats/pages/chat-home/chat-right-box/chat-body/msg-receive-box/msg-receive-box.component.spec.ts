import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgReceiveBoxComponent } from './msg-receive-box.component';

describe('MsgReceiveBoxComponent', () => {
  let component: MsgReceiveBoxComponent;
  let fixture: ComponentFixture<MsgReceiveBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MsgReceiveBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MsgReceiveBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
