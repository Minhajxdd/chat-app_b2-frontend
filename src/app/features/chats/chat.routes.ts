import { Routes } from '@angular/router';
import { UserAuthorizedGuard } from '../../core/auth/guards/user.authorized.guards';
import { ChatHomeComponent } from './pages/chat-home/chat-home.component';

export const booksRoute: Routes = [
    {
        path: '',
        redirectTo: 'chat',
        pathMatch: 'full',
    },
    {
        path: 'chat',
        component: ChatHomeComponent,
        canActivate: [UserAuthorizedGuard],
    },
    { path: '**', redirectTo: 'chat' },
];
