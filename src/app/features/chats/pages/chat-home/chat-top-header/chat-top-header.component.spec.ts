import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatTopHeaderComponent } from './chat-top-header.component';

describe('ChatTopHeaderComponent', () => {
  let component: ChatTopHeaderComponent;
  let fixture: ComponentFixture<ChatTopHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatTopHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatTopHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
