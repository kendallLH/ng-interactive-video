import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractiveCard } from './interactive-card';

describe('InteractiveCard', () => {
  let component: InteractiveCard;
  let fixture: ComponentFixture<InteractiveCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InteractiveCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteractiveCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
