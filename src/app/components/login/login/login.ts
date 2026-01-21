import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';

import { UserType } from '../../../shared/constants';
import { CommunicationService } from '../../../services/communication/communication-service';

@Component({
  selector: 'app-login',
  imports: [CardModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private communicationService = inject(CommunicationService);
  userTypeEnum = UserType;

  setUser(userType: string) {
    this.communicationService.setUserType(userType);
  }
}
