import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-login',
  imports: [ButtonModule, CardModule, RouterLink, TooltipModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {}
