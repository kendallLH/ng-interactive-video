import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentVideoView } from './student-video-view';

describe('StudentVideoView', () => {
  let component: StudentVideoView;
  let fixture: ComponentFixture<StudentVideoView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentVideoView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentVideoView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
