import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreedotDropdownComponent } from './threedot-dropdown.component';

describe('ThreedotDropdownComponent', () => {
  let component: ThreedotDropdownComponent;
  let fixture: ComponentFixture<ThreedotDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreedotDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreedotDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
