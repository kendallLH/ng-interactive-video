import { Component, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

import { Annotation } from '../../../../models/annotation';

@Component({
  selector: 'app-annotation-overlay',
  imports: [ButtonModule, DialogModule],
  templateUrl: './annotation-overlay.html',
  styleUrl: './annotation-overlay.scss',
})
export class AnnotationOverlay {
  @Input() annotation: Annotation;
  @Output() close: boolean = false;
  visible = true;

  // or on answer
  onClose() {
    this.close = true;
  }
}
