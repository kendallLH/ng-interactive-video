import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-login',
  imports: [CardModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {}
