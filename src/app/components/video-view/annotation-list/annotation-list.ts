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
    // THIS WORKS
    // // Connect to annotations$ observable stream
    // this.annotations$ = this.communicationService.getAnnotations$();
    // // Get the current annotations
    // const storedAnnotations = this.localStorage.getListItems(LocalStorageConstants.ANNOTATIONS);
    // if (storedAnnotations && storedAnnotations.length > 0) {
    //   // Send the current annotations down the observable stream
    //   this.communicationService.setAnnotations(storedAnnotations);
    // }

    // TODO - unsubscribe
    this.annotations$ = this.communicationService // TODO - should this code be inside this observable or outside of it?
      .getAnnotations$()
      .pipe(
        map((annotations) => {
          if (annotations.length === 0) {
            annotations = this.localStorage.getListItems(LocalStorageConstants.ANNOTATIONS);
          }
          const filteredAnnotations = annotations.filter(
            (annotation: Annotation) => annotation.videoId === this.videoId,
          );
          return filteredAnnotations;
        }),
      ); // don't need subscribe cause of async pipe
  }

  deleteAnnotation(annotationId: string) {
    // const isExistingNote = this.noteActions.getNoteId() !== '';

    // if (isExistingNote) {
    // delete note
    const updatedAnnotations = this.localStorage.removeListItemById(
      LocalStorageConstants.ANNOTATIONS,
      annotationId,
    );

    // need to update the page here or something
    // make sur you update the observable whenever local storage is updated
    this.communicationService.setAnnotations(updatedAnnotations);
  }
}
