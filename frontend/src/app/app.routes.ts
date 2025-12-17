import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { permissionGuard } from './guards/permission.guard';
import { ArticlesComponent } from './components/articles/articles.component/articles.component';
import { LoginComponent } from './components/auth/login.component/login.component';
import { UnauthorizedComponent } from './components/auth/unauthorized.component/unauthorized.component';
import { CreateArticleComponent } from './components/articles/create-article.component/create-article.component';
import { DashboardComponent } from './components/dashboard.component/dashboard.component';


export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'unauthorized',
        component: UnauthorizedComponent
    },
    {
        path: 'articles',
        component: ArticlesComponent,
        canActivate: [authGuard]
    },

    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard]
    },
    {
        path: 'articles/create',
        component: CreateArticleComponent,
        canActivate: [authGuard, permissionGuard],
        data: { permission: 'create_article' }
    },
    {
        path: 'articles/edit/:id',
        component: CreateArticleComponent,
        canActivate: [authGuard, permissionGuard],
        data: { permission: 'edit_article' }
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    }
];
