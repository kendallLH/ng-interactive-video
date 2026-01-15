import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-interactive-card',
  imports: [
    CardModule,
    FormsModule,
    InputGroupAddonModule,
    InputGroupModule,
    InputTextModule,
    SelectModule,
  ],
  templateUrl: './interactive-card.html',
  styleUrl: './interactive-card.scss',
})
export class InteractiveCard {
  answers = [
    { name: 'A', code: 'NY' },
    { name: 'B', code: 'RM' },
    { name: 'C', code: 'LDN' },
    { name: 'D', code: 'IST' },
  ];

  // Types of interactions
  // multi-choic
  // long form answer
  // note (no input from student required)
}
