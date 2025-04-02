import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { authRoutes } from './core/auth/auth.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { chatRoutes } from './features/chats/chat.routes';
import { TokenInterceptor } from './core/auth/interceptors/auth-interceptor';
import { AuthInterceptor } from './core/auth/interceptors/auth-refresh.interceptor';

const routes = [...authRoutes, ...chatRoutes];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([TokenInterceptor, AuthInterceptor]))
  ],
};
