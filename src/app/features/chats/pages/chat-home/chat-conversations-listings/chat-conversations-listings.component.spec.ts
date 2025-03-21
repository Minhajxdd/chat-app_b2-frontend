import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatConversationsListingsComponent } from './chat-conversations-listings.component';

describe('ChatConversationsListingsComponent', () => {
  let component: ChatConversationsListingsComponent;
  let fixture: ComponentFixture<ChatConversationsListingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatConversationsListingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatConversationsListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
