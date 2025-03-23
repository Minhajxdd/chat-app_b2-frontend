import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopThreeDotComponent } from './top-three-dot.component';

describe('TopThreeDotComponent', () => {
  let component: TopThreeDotComponent;
  let fixture: ComponentFixture<TopThreeDotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopThreeDotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopThreeDotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
