import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

import { CommunicationService } from '../../../services/communication/communication-service';

enum InteractionType {
  multiChoice,
  longForm,
  note,
}

type MultiChoiceQuestion = {
  // id: string;
  timestamp: string;
  correctAnswer: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
};

type LongFormQuestion = {
  id: string;
  timestamp: string;
  question: string;
  // answer?: string; // for student
};

type Note = {
  id: string;
  timestamp: string;
  headline?: string;
  paragraph?: string;
};

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
  templateUrl: './interactive-card.html',
  styleUrl: './interactive-card.scss',
})
export class InteractiveCard {
  private communicationService = inject(CommunicationService);
  private formBuilder = inject(FormBuilder);

  interactionType: InteractionType = InteractionType.multiChoice;
  interactiveCardForm!: FormGroup;
  formTypes = ['Multiple Choice', 'Long Form', 'Note']; // TODO - make constants for these or can i use the enum? not sure since it's a string
  answers = [
    { name: 'A', code: 'NY' },
    { name: 'B', code: 'RM' },
    { name: 'C', code: 'LDN' },
    { name: 'D', code: 'IST' },
  ];

  ngOnInit() {
    this.interactiveCardForm = this.formBuilder.group({
      sharedForm: this.formBuilder.group({
        // email: ['', [Validators.required, Validators.email]],
        // phone: ['', Validators.required],
        formTypeSelect: [this.formTypes[0]], // TODO - use the constant for this
      }),
      multiChoiceForm: this.formBuilder.group({
        // inputTypeSelector: ['text', Validators.required], // Control to select the type
        // dynamicField: ['', Validators.required], // The field that changes
        optionA: [''],
        optionB: [''],
        optionC: [''],
        optionD: [''],
      }),
    });
    const multiChoiceForm = this.formBuilder.group({});

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
    console.log('onSubmit', this.interactiveCardForm.get('multiChoiceForm')?.value);
    // this.myform.reset()

    this.communicationService.setShowInteractiveCard(false);
  }

  cancel() {
    this.communicationService.setShowInteractiveCard(false);
    // this.myform.reset()
  }
}
