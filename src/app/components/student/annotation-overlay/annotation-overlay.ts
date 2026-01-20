import { Component, Input, Output } from '@angular/core';
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
  letters = ['A', 'B', 'C', 'D'];
  selectedAnswer: string = '';
  visible = true;

  onSubmit() {
    this.visible = false;
  }

  setSelectedAnswer(selected: string) {
    this.selectedAnswer = selected;
  }
}
