import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotationList } from './annotation-list';

describe('AnnotationList', () => {
  let component: AnnotationList;
  let fixture: ComponentFixture<AnnotationList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnotationList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnotationList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
