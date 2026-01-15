import { Component, inject } from '@angular/core';
// import { ButtonModule } from 'primeng/button';
import { SpeedDialModule } from 'primeng/speeddial';
import { take } from 'rxjs/operators';

import { InteractiveCard } from '../interactive-card/interactive-card';
import { VideoPlayer } from '../video-player/video-player';
import { CommunicationService } from '../../../services/communication/communication-service';

@Component({
  selector: 'app-video-view',
  imports: [InteractiveCard, SpeedDialModule, VideoPlayer],
  templateUrl: './video-view.html',
  styleUrl: './video-view.scss',
})
export class VideoView {
  private communicationService = inject(CommunicationService);

  // url = 'https://vjs.zencdn.net/v/oceans.mp4';
  items = [
    {
      label: 'Multiple Choice',
      icon: 'pi pi-plus',
      command: () => {
        console.log('Add multiple choice clicked!');
        // Your add logic here
        this.addInteraction();
      },
    },
    {
      label: 'Note',
      icon: 'pi pi-pencil',
      command: () => {
        console.log('Add note choice clicked!');
        // Your add logic here
        this.addInteraction();
      },
    },
  ];

  questions = [
    {
      id: 1,
      question: 'What is the value of pi (π)?',
      answer: '3.14',
      info: "Pi is a mathematical constant that represents the ratio of a circle's circumference to its diameter.",

      options: ['2.71', '3.14', '4.16'],
    },
    {
      id: 2,
      question: 'What is the formula to find the area of a rectangle?',
      answer: 'length x width',
      info: 'The area of a rectangle is the product of its length and width.',

      options: ['length + width', 'length x width', '2 x (length + width)'],
    },
    {
      id: 3,
      question: 'What is the formula to find the circumference of a circle?',
      answer: '2 x pi x radius',
      info: 'The circumference of a circle is the distance around the circle.',

      options: ['pi x radius', '2 x pi x radius', 'pi x diameter'],
    },
    {
      id: 4,
      question: 'What is the value of the angle sum of a triangle?',
      answer: '180 degrees',
      info: 'The sum of the three angles in any triangle is always 180 degrees.',

      options: ['90 degrees', '120 degrees', '180 degrees'],
    },
    {
      id: 5,
      question: 'What is the formula to find the volume of a rectangular prism?',
      answer: 'length x width x height',
      info: 'The volume of a rectangular prism is the product of its length, width, and height.',

      options: [
        'length + width + height',
        'length x width x height',
        '2 x (length x width + width x height + height x length)',
      ],
    },
    {
      id: 6,
      question: 'What is the value of x if 2x + 5 = 13?',
      answer: '4',
      info: 'To solve for x, we need to subtract 5 from both sides of the equation to get 2x = 8. Then, we divide both sides by 2 to get x = 4.',
      options: ['4', '6', '8'],
    },
  ];

  ngOnInit() {}

  addInteraction() {
    this.communicationService
      .getVideoPlayer$()
      .pipe(take(1))
      .subscribe((player: any) => {
        // TODO: any type
        // // TODO: convert timestamp from seconds to 00h00m00s
        player.pause();
        player.currentTime();
      });
  }
}
