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

import { Annotation } from '../../../models/annotation';
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
  // Inputs
  @Input() timestamp: number;
  @Input() videoId: string;
  // Injections
  private communicationService = inject(CommunicationService);
  private datePipe = inject(DatePipe);
  private localStorage = inject(LocalStorage);
  private formBuilder = inject(FormBuilder);
  private utilities = inject(Utilities);
  // Variables
  classOptions = ['Algebra 1', 'Algebra 2', 'Calculus 1', 'Korean 1'];
  annotationInputForm!: FormGroup;
  annotationTypeOptions = ['Multiple Choice']; // TODO - make constants for these or can i use the enum? not sure since it's a string
  // In future will have
  // 'Long Form', 'Note'
  correctAnswer: string = '';
  showPopover: boolean = false;

  ngOnInit() {
    this.setCorrectAnswer('');
    console.log('original timestamp', this.timestamp);
    // https://stackoverflow.com/questions/52321653/angular-datepipe-convert-seconds-to-time-with-zero-timezone-12-instead-of-00
    const convertedTimestamp = this.datePipe.transform(
      (this.timestamp | 0) * 1000,
      'H:mm:ss',
      'UTC',
    );
    console.log('converted timestamp', convertedTimestamp);
    this.annotationInputForm = this.formBuilder.group({
      sharedForm: this.formBuilder.group({
        // email: ['', [Validators.required, Validators.email]],
        // phone: ['', Validators.required],
        annotationTypeSelect: [this.annotationTypeOptions[0]], // TODO - use the constant for this
        headline: [''],
        timestampPicker: [convertedTimestamp],
      }),
      multiChoiceForm: this.formBuilder.group({
        optionA: [''],
        optionB: [''],
        optionC: [''],
        optionD: [''],
      }),
    });

    // const sharedForm = this.formBuilder.group({
    //   // email: ['', [Validators.required, Validators.email]],
    //   // phone: ['', Validators.required],
    // });
    // // Subscribe to changes in the selector to update the dynamic field's properties
    // // this.form.get('inputTypeSelector')?.valueChanges.subscribe((value) => {
    // //   // You can add/remove validators or other logic here if needed
    // //   // For switching the input type, most logic stays in the template
    // // });

    // enable or disable certain parts of the form as needed
    // const multiChoiceGroup = this.annotationInputForm.get('multiChoiceForm') as FormGroup;
    // multiChoiceGroup.disable();
    // multiChoiceGropu.enable();
  }

  submit() {
    // TODO - this is for multiple choice only, need to add an if or switch
    console.log('onSubmit', this.annotationInputForm.get('multiChoiceForm')?.value);
    // this.myform.reset()

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
        const newContent = {
          options: [
            contentForm.optionA,
            contentForm.optionB,
            contentForm.optionC,
            contentForm.optionD,
          ],
          correctAnswer: this.correctAnswer,
        };

        console.log('timestamp', sharedForm.timestampPicker);
        const timestampInSeconds = this.utilities.getSecondsFromHHMMSS(sharedForm.timestampPicker);

        const newAnnotation: Annotation = {
          id: annotationId,
          dynamicContent: newContent,
          headline: sharedForm.headline,
          timestamp: timestampInSeconds,
          videoId: this.videoId,
        };

        // Update local storage
        // Update annotations$
        this.communicationService.setAnnotations(
          this.localStorage.addListItem(LocalStorageConstants.ANNOTATIONS, newAnnotation),
        );

        // this.annotationPopover.toggle();
        player.play();
      });

    // TODO clear the card? / reset form this.myform.reset()
    // Close the card
    this.communicationService.setShowInteractiveCard(false); // tODO - don't need this anymore
    this.setCorrectAnswer('');
    // this.showPopover = true;
    this.annotationPopover.hide();
  }

  cancel() {
    this.communicationService.setShowInteractiveCard(false);
    // this.myform.reset()
    // this.showPopover = false;
    this.setCorrectAnswer('');
    this.annotationPopover.hide();
  }

  setCorrectAnswer(correctAnswer: string) {
    this.correctAnswer = correctAnswer;
  }
}
