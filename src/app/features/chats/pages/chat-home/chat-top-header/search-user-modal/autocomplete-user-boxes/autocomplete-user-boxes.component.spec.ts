import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteUserBoxesComponent } from './autocomplete-user-boxes.component';

describe('AutocompleteUserBoxesComponent', () => {
  let component: AutocompleteUserBoxesComponent;
  let fixture: ComponentFixture<AutocompleteUserBoxesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutocompleteUserBoxesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutocompleteUserBoxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
