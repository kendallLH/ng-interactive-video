import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherVideoView } from './teacher-video-view';

describe('TeacherVideoView', () => {
  let component: TeacherVideoView;
  let fixture: ComponentFixture<TeacherVideoView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherVideoView],
    }).compileComponents();

    fixture = TestBed.createComponent(TeacherVideoView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
