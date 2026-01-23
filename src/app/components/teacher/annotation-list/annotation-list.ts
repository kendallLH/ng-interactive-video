import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { LocalStorage } from '../../../services/local-storage/local-storage';
import { CommunicationService } from '../../../services/communication/communication-service';
import { LocalStorageConstants } from '../../../shared/constants';
import { Annotation } from '../../../models/annotation';

@Component({
  selector: 'app-annotation-list',
  imports: [AsyncPipe, DatePipe],
  templateUrl: './annotation-list.html',
  styleUrl: './annotation-list.scss',
})
export class AnnotationList implements OnInit {
  @Input() videoId: string;
  private communicationService = inject(CommunicationService);
  private localStorage = inject(LocalStorage);
  annotations$: Observable<any>;

  ngOnInit() {
    this.annotations$ = this.communicationService.getAnnotations$().pipe(
      map((annotations) => {
        if (annotations.length === 0) {
          annotations = this.localStorage.getListItems(LocalStorageConstants.ANNOTATIONS);
        }
        // Get the annotations associated with this video
        const filteredAnnotations = annotations.filter(
          (annotation: Annotation) => annotation.videoId === this.videoId,
        );
        // Sort the annotations by ascending timestamp
        filteredAnnotations.sort((a: Annotation, b: Annotation) => {
          return a.timestamp - b.timestamp;
        });
        return filteredAnnotations;
      }),
    );
  }

  deleteAnnotation(event: Event, annotationId: string) {
    event.stopPropagation(); // prevent the parent click action from firing
    const updatedAnnotations = this.localStorage.removeListItemById(
      LocalStorageConstants.ANNOTATIONS,
      annotationId,
    );
    this.communicationService.setAnnotations(updatedAnnotations);
  }

  navigateToTimestamp(timestamp: number) {
    this.communicationService
      .getVideoPlayer$()
      .pipe(take(1))
      .subscribe((player) => {
        player.currentTime(timestamp);
        player.play();
      });
  }
}
