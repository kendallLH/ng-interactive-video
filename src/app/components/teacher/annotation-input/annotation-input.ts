import { DatePipe } from '@angular/common';
import { Component, inject, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { Popover, PopoverModule } from 'primeng/popover';
import { SelectModule } from 'primeng/select';
import { take } from 'rxjs';

import { Annotation, AnnotationType } from '../../../models/annotation';
import { LocalStorageConstants } from '../../../shared/constants';
import { CommunicationService } from '../../../services/communication/communication-service';
import { LocalStorage } from '../../../services/local-storage/local-storage';
import { Utilities } from '../../../services/utilities/utilities';

@Component({
  selector: 'app-annotation-input',
  imports: [
    ButtonModule,
    CardModule,
    DatePickerModule,
    InputGroupAddonModule,
    InputGroupModule,
    InputTextModule,
    PopoverModule,
    ReactiveFormsModule,
    SelectModule,
  ],
  providers: [DatePipe],
  templateUrl: './annotation-input.html',
  styleUrl: './annotation-input.scss',
})
export class AnnotationInput {
  @ViewChild('popover') annotationPopover: Popover;
  @Input() timestamp: number;
  @Input() videoId: string;
  private communicationService = inject(CommunicationService);
  private datePipe = inject(DatePipe);
  private localStorage = inject(LocalStorage);
  private formBuilder = inject(FormBuilder);
  private utilities = inject(Utilities);
  annotationInputForm!: FormGroup;
  annotationTypeOptions = ['Multiple Choice']; // TODO - make constants for these or can i use the enum? not sure since it's a string
  // In future will have
  // 'Long Form', 'Note'
  correctAnswer: string = '';

  ngOnInit() {
    this.setCorrectAnswer('');
    this.annotationInputForm = this.formBuilder.group({
      sharedForm: this.formBuilder.group({
        annotationTypeSelect: [this.annotationTypeOptions[0], { nonNullable: true }], // TODO - use the constant for this
        headline: ['', Validators.required],
        timestampPicker: [0, Validators.required],
      }),
      multiChoiceForm: this.formBuilder.group({
        optionA: ['', Validators.required],
        optionB: ['', Validators.required],
        optionC: ['', Validators.required],
        optionD: ['', Validators.required],
      }),
    });

    // enable or disable certain parts of the form as needed (use for future state of multiple form types)
    // const multiChoiceGroup = this.annotationInputForm.get('multiChoiceForm') as FormGroup;
    // multiChoiceGroup.disable();
    // multiChoiceGropu.enable();
  }

  setTimestampValue() {
    const convertedTimestamp = this.datePipe.transform(
      (this.timestamp | 0) * 1000,
      'H:mm:ss',
      'UTC',
    );
    this.annotationInputForm.get('sharedForm')?.patchValue({ timestampPicker: convertedTimestamp });
  }

  submitCard() {
    this.communicationService // should i make this it's own function??
      .getVideoPlayer$()
      .pipe(take(1))
      .subscribe((player: any) => {
        // TODO: any type

        // If EDIT - would check if this annotation object already exists
        const sharedForm = this.annotationInputForm.get('sharedForm')?.value;
        var randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        const annotationId = randomLetter + Date.now();

        // This works specifically for a multiple choice form
        // In future would conditionally create contentForm and newContent based on form type
        const contentForm = this.annotationInputForm.get('multiChoiceForm')?.value;
        console.log('timestamp', sharedForm.timestampPicker);
        const timestampInSeconds = this.utilities.getSecondsFromHHMMSS(sharedForm.timestampPicker);

        const newAnnotation: Annotation = {
          id: annotationId,
          correctAnswer: this.correctAnswer,
          headline: sharedForm.headline,
          answerOptions: [
            contentForm.optionA,
            contentForm.optionB,
            contentForm.optionC,
            contentForm.optionD,
          ],
          timestamp: timestampInSeconds,
          type: AnnotationType.MultipleChoice, // hardcoded for now but can be modified in future
          videoId: this.videoId,
        };

        // Update local storage
        // Update annotations$
        this.communicationService.setAnnotations(
          this.localStorage.addListItem(LocalStorageConstants.ANNOTATIONS, newAnnotation),
        );
        player.play();
      });

    // Close the card
    this.closeCard();
  }

  closeCard() {
    this.setCorrectAnswer('');
    this.annotationInputForm.reset();
    this.annotationPopover.hide();
  }

  setCorrectAnswer(correctAnswer: string) {
    this.correctAnswer = correctAnswer;
  }
}
