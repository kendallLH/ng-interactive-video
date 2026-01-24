import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { UtilityService } from '../../../services/utility/utility-service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private router = inject(Router);
  private utilityService = inject(UtilityService);

  routeDashboard() {
    // Don't navigate if user hasn't been selected
    if (window.location.pathname !== '/') {
      const userType = this.utilityService.getUserTypeFromUrlPath();
      this.router.navigate([`/${userType}-dashboard`]);
    }
  }
}
