import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

import { Annotation } from '../../../models/annotation';

@Component({
  selector: 'app-annotation-overlay',
  imports: [ButtonModule, DialogModule],
  templateUrl: './annotation-overlay.html',
  styleUrl: './annotation-overlay.scss',
})
export class AnnotationOverlay {
  @Input() annotation: Annotation;
  @Output() closed = new EventEmitter<boolean>();
  letters = ['A', 'B', 'C', 'D'];
  selectedAnswer: string = '';
  visible = true;

  onSubmit() {
    this.visible = false;
    this.closed.emit(true);
  }

  setSelectedAnswer(selected: string) {
    this.selectedAnswer = selected;
  }
}
