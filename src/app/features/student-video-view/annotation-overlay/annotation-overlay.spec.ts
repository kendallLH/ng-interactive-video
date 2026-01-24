import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotationOverlay } from './annotation-overlay';

describe('AnnotationOverlay', () => {
  let component: AnnotationOverlay;
  let fixture: ComponentFixture<AnnotationOverlay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnotationOverlay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnotationOverlay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
