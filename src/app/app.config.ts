import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { authRoutes } from './auth/app-auth.routes';
import { marketingRoutes } from './marketing/app-marketing.routes';
import { provideHttpClient } from '@angular/common/http';

export {}
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter([...routes, ...authRoutes, ...marketingRoutes]),  provideHttpClient()]
};
