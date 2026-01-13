import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Nora from '@primeuix/themes/nora'; // Nora is the other one I liked

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    providePrimeNG({ ripple: true, theme: { preset: Nora } }),

    provideRouter(routes),
  ],
};
