import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Observable, take } from 'rxjs';

import { CommunicationService } from '../../../services/communication/communication-service';

@Component({
  selector: 'app-header',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  private communicationService = inject(CommunicationService);
  private router = inject(Router);
  userType$: Observable<string>;

  ngOnInit(): void {
    this.userType$ = this.communicationService.getUserType$();
  }

  routeHome() {
    this.userType$.pipe(take(1)).subscribe((userType) => {
      this.router.navigate([`/${userType}-dashboard`]);
    });
  }
}
