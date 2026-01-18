import { AsyncPipe } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LocalStorage } from '../../../services/local-storage/local-storage';
import { CommunicationService } from '../../../services/communication/communication-service';
import { LocalStorageConstants } from '../../../shared/constants';
import { Annotation } from '../../../models/annotation';

@Component({
  selector: 'app-annotation-list',
  imports: [AsyncPipe],
  templateUrl: './annotation-list.html',
  styleUrl: './annotation-list.scss',
})
export class AnnotationList implements OnInit {
  // Inputs
  @Input() videoId: string;
  // Injections
  private communicationService = inject(CommunicationService);
  private localStorage = inject(LocalStorage);
  // Variables
  annotations$: Observable<any>;

  ngOnInit() {
    // TODO - unsubscribe
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
    ); // don't need unsubscribe cause of async pipe
  }

  deleteAnnotation(annotationId: string) {
    // const isExistingNote = this.noteActions.getNoteId() !== '';

    // if (isExistingNote) {
    // delete note
    const updatedAnnotations = this.localStorage.removeListItemById(
      LocalStorageConstants.ANNOTATIONS,
      annotationId,
    );

    this.communicationService.setAnnotations(updatedAnnotations);
  }
}
