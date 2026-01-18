import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotationInput } from './annotation-input';

describe('AnnotationInput', () => {
  let component: AnnotationInput;
  let fixture: ComponentFixture<AnnotationInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnotationInput],
    }).compileComponents();

    fixture = TestBed.createComponent(AnnotationInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
