import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { UtilityService } from '../../../services/utility/utility-service';

@Component({
  selector: 'app-header',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private router = inject(Router);
  private utilityService = inject(UtilityService);

  routeDashboard() {
    // This only works since we have only two user type options
    // Usually you would use an observable after getting a user object from the authentication flow
    // In this case, since the user isn't required to go through the authentication flow for every session
    // that observable may not always be populated. So for this use case, using the current url to determine
    // the user type works best

    // Don't navigate if user hasn't been selected
    if (window.location.pathname !== '/') {
      const userType = this.utilityService.getUserTypeFromUrlPath();
      this.router.navigate([`/${userType}-dashboard`]);
    }
  }
}
