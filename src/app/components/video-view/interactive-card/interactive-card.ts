import { DatePipe } from '@angular/common';
import { Component, inject, Input, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

import { CommunicationService } from '../../../services/communication/communication-service';
import { take } from 'rxjs';
import { Annotation, NoteContent, QuestionContent } from '../../../models/annotation';
import { LocalStorage } from '../../../services/local-storage/local-storage';

enum InteractionType {
  multiChoice,
  longForm,
  note,
}

// TODO - rename this to annotation-input

@Component({
  selector: 'app-interactive-card',
  imports: [
    ButtonModule,
    CardModule,
    DatePickerModule,
    InputGroupAddonModule,
    InputGroupModule,
    InputTextModule,
    ReactiveFormsModule,
    SelectModule,
  ],
  providers: [DatePipe],
  templateUrl: './interactive-card.html',
  styleUrl: './interactive-card.scss',
})
export class InteractiveCard {
  // Inputs
  @Input() className: string;
  @Input() timestamp: number;
  @Input() videoId: string;
  // Injections
  private communicationService = inject(CommunicationService);
  private datePipe = inject(DatePipe);
  private localStorage = inject(LocalStorage);
  private formBuilder = inject(FormBuilder);
  // Variables
  classOptions = ['Algebra 1', 'Algebra 2', 'Calculus 1', 'Korean 1'];
  interactionType: InteractionType = InteractionType.multiChoice;
  interactiveCardForm!: FormGroup;
  formTypes = ['Multiple Choice', 'Long Form', 'Note']; // TODO - make constants for these or can i use the enum? not sure since it's a string
  // answers = [
  //   { name: 'A', code: 'NY' },
  //   { name: 'B', code: 'RM' },
  //   { name: 'C', code: 'LDN' },
  //   { name: 'D', code: 'IST' },
  // ];

  ngOnInit() {
    console.log('original timestamp', this.timestamp);
    // https://stackoverflow.com/questions/52321653/angular-datepipe-convert-seconds-to-time-with-zero-timezone-12-instead-of-00
    const convertedTimestamp = this.datePipe.transform(this.timestamp * 1000, 'H:mm:ss', 'UTC');
    console.log('converted timestamp', convertedTimestamp);
    this.interactiveCardForm = this.formBuilder.group({
      sharedForm: this.formBuilder.group({
        // email: ['', [Validators.required, Validators.email]],
        // phone: ['', Validators.required],
        classSelect: [''], // TODO - use the constant for this
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
    // const multiChoiceGroup = this.interactiveCardForm.get('multiChoiceForm') as FormGroup;
    // multiChoiceGroup.disable();
    // multiChoiceGropu.enable();
  }

  submit() {
    // TODO - this is for multiple choice only, need to add an if or switch
    console.log('onSubmit', this.interactiveCardForm.get('multiChoiceForm')?.value);
    // this.myform.reset()

    this.communicationService // should i make this it's own function??
      .getVideoPlayer$()
      .pipe(take(1))
      .subscribe((player: any) => {
        // TODO: any type

        // If EDIT - would check if this annotation object already exists
        const sharedForm = this.interactiveCardForm.get('sharedForm')?.value;
        var randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        const annotationId = randomLetter + Date.now();

        // This works specifically for a multiple choice form
        // In future would conditionally create contentForm and newContent based on form type
        const contentForm = this.interactiveCardForm.get('multiChoiceForm')?.value;
        const newContent = {
          options: [
            contentForm.optionA,
            contentForm.optionB,
            contentForm.optionC,
            contentForm.optionD,
          ],
          // correctAnswer:
        };

        const newAnnotation: Annotation = {
          id: annotationId,
          className: this.className,
          dynamicContent: newContent,
          headline: sharedForm.headline,
          timestamp: sharedForm.timestampPicker,
          videoId: this.videoId, // TODO - hardcoding this for now (hardcoded video id)
        };

        // Update local storage
        // Update annotations$
        this.communicationService.setAnnotations(this.localStorage.addListItem(newAnnotation));

        player.play();
      });

    // TODO clear the card? / reset form this.myform.reset()
    // Close the card
    this.communicationService.setShowInteractiveCard(false);
  }

  cancel() {
    this.communicationService.setShowInteractiveCard(false);
    // this.myform.reset()
  }
}
