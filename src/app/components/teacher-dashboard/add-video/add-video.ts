import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

import { Constants } from '../../../shared/constants';
import { Utilities } from '../../../services/utilities/utilities';

@Component({
  selector: 'app-add-video',
  imports: [ButtonModule, FormsModule, InputTextModule, SelectModule],
  templateUrl: './add-video.html',
  styleUrl: './add-video.scss',
})
export class AddVideo {
  private router = inject(Router);
  private utilities = inject(Utilities);
  inputUrl: string = '';
  selectedClass: string = '';

  onSubmit() {
    const videoId = this.utilities.getVideoIdFromYouTubeUrl(this.inputUrl);
    this.router.navigate(['/player', Constants.TEACHER, videoId]);
  }
}
