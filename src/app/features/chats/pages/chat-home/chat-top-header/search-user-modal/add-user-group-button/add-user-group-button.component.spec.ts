import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserGroupButtonComponent } from './add-user-group-button.component';

describe('AddUserGroupButtonComponent', () => {
  let component: AddUserGroupButtonComponent;
  let fixture: ComponentFixture<AddUserGroupButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUserGroupButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserGroupButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
