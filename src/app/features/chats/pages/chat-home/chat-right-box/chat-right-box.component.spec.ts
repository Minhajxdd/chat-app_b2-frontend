import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatRightBoxComponent } from './chat-right-box.component';

describe('ChatRightBoxComponent', () => {
  let component: ChatRightBoxComponent;
  let fixture: ComponentFixture<ChatRightBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatRightBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatRightBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
