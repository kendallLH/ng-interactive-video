import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { User } from '../../../services/user/user';

@Component({
  selector: 'app-login',
  imports: [CardModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private userService = inject(User);

  setUser(userId: string) {
    this.userService.setCurrentUser(userId);
  }
}
