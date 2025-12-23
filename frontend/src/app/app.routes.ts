import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { permissionGuard } from './guards/permission.guard';
import { ArticlesComponent } from './components/articles/articles.component/articles.component';
import { LoginComponent } from './components/auth/login.component/login.component';
import { UnauthorizedComponent } from './components/auth/unauthorized.component/unauthorized.component';
import { CreateArticleComponent } from './components/articles/create-article.component/create-article.component';
import { DashboardComponent } from './components/dashboard.component/dashboard.component';
import { AccessMatrixComponent } from './components/access-matrix.component/access-matrix.component';
import { Users } from './components/users/users/users';
import { CreateEditUser } from './components/users/create-edit-user/create-edit-user';


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
        path: 'access_matrix',
        component: AccessMatrixComponent,
        canActivate: [authGuard, permissionGuard],
        data: { permission: 'access_matrix' }
    },
    {
        path: 'users',
        component: Users,
        canActivate: [authGuard, permissionGuard],
        data: { permission: 'manage_users' }
    },
    {
        path: 'users/create',
        component: CreateEditUser,
        canActivate: [authGuard, permissionGuard],
        data: { permission: 'manage_users' }
    },
    {
        path: 'users/edit/:id',
        component: CreateEditUser,
        canActivate: [authGuard, permissionGuard],
        data: { permission: 'manage_users' }
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    }
];
