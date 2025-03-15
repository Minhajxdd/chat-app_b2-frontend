import { Routes } from '@angular/router';
import { AuthFormComponent } from './pages/auth-form/auth-form.component';
import { UserUnauthorizedAuthGuard } from './guards/user-unauthorized.guards';

export const authRoutes: Routes = [
    {
        path: 'register',
        component: AuthFormComponent,
        canActivate: [UserUnauthorizedAuthGuard],
    },
    {
        path: 'login',
        component: AuthFormComponent,
        canActivate: [UserUnauthorizedAuthGuard],
    },
];
