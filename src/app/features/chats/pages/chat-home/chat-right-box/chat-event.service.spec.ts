import { TestBed } from '@angular/core/testing';

import { ChatEventService } from './chat-event.service';

describe('ChatEventService', () => {
  let service: ChatEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
