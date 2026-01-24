import { DatePipe } from '@angular/common';
import { Component, inject, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { Popover, PopoverModule } from 'primeng/popover';
import { SelectModule } from 'primeng/select';
import { take } from 'rxjs';

import { Annotation, AnnotationType } from '../../../models/annotation';
import { LocalStorageConstants, MultipleChoiceConstants } from '../../../shared/constants';
import { CommunicationService } from '../../../services/communication/communication-service';
import { LocalStorageService } from '../../../services/local-storage/local-storage-service';
import { UtilityService } from '../../../services/utility/utility-service';

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
  private localStorageService = inject(LocalStorageService);
  private formBuilder = inject(FormBuilder);
  private utilityService = inject(UtilityService);
  annotationInputForm!: FormGroup;
  annotationTypeOptions = [AnnotationType.MultipleChoice];
  correctAnswer: string = '';
  multipleChoiceConstants = MultipleChoiceConstants; // Needed for use in the template
  multipleChoiceOptions = [
    MultipleChoiceConstants.OPTION_A,
    MultipleChoiceConstants.OPTION_B,
    MultipleChoiceConstants.OPTION_C,
    MultipleChoiceConstants.OPTION_D,
  ];

  ngOnInit() {
    this.setCorrectAnswer('');
    this.buildAnnotationInputForm();
  }

  buildAnnotationInputForm() {
    this.annotationInputForm = this.formBuilder.group({
      sharedForm: this.formBuilder.group({
        annotationTypeSelect: [this.annotationTypeOptions[0], { nonNullable: true }],
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
  }

  closeCard() {
    this.setCorrectAnswer('');
    this.annotationInputForm.reset();
    this.annotationPopover.hide();
  }

  // TOOD - move to a service?
  createNewAnnotation() {
    const sharedForm = this.annotationInputForm.get('sharedForm')?.value;
    const contentForm = this.annotationInputForm.get('multiChoiceForm')?.value;
    const timestampInSeconds = this.utilityService.getSecondsFromHHMMSS(sharedForm.timestampPicker);
    var randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const annotationId = randomLetter + Date.now();
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
    return newAnnotation;
  }

  setCorrectAnswer(correctAnswer: string) {
    this.correctAnswer = correctAnswer;
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
    this.communicationService
      .getVideoPlayer$()
      .pipe(take(1))
      .subscribe((player: any) => {
        // TODO: any type
        const newAnnotation = this.createNewAnnotation();
        // Update local storage and annotations$
        this.communicationService.setAnnotations(
          this.localStorageService.addListItem(LocalStorageConstants.ANNOTATIONS, newAnnotation),
        );
        player.play();
      });

    this.closeCard();
  }
}
