import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { UtilityService } from '../../../services/utility/utility-service';

@Component({
  selector: 'app-login',
  imports: [ButtonModule, CardModule, RouterLink, TooltipModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private utilityService = inject(UtilityService);
  addMockData() {
    this.utilityService.prePopulateData();
  }
}
