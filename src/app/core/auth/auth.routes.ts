import { Routes } from '@angular/router';
import { AuthFormComponent } from './pages/auth-form/auth-form.component';

export const authRoutes: Routes = [
    {
        path: 'register',
        component: AuthFormComponent,
    },
    {
        path: 'login',
        component: AuthFormComponent,
    },
];
