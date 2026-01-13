import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

import { Constants } from '../../../shared/constants';

@Component({
  selector: 'app-add-video',
  imports: [ButtonModule, FormsModule, InputTextModule, SelectModule],
  templateUrl: './add-video.html',
  styleUrl: './add-video.scss',
})
export class AddVideo {
  private router = inject(Router);
  inputUrl: string = '';
  selectedClass: string = '';

  // hardcoded for now
  // - IDEAL STATE will want to put in a json list as if it's an api to make a mock api call
  // - OR if not enough time, just put this in a constants file
  classes = ['Algebra 1', 'Algebra 2', 'Calculus 1', 'Calculus 2', 'Statistics 1'];

  onSubmit() {
    console.log('input url', this.inputUrl);
    this.router.navigate(['/player', Constants.TEACHER]); // put this on the video tile when it's clicked
  }
}
