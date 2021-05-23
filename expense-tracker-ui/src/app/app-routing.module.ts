import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: '', component: TransactionListComponent, canActivate: [AuthGuard] },
    { path: 'transaction-list', component: TransactionListComponent, canActivate: [AuthGuard] },
    { path: 'category-list', component: CategoryListComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
