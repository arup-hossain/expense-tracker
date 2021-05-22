import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';

const routes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: '', component: TransactionListComponent },
    { path: 'transaction-list', component: TransactionListComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
