import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { TransactionPopupComponent } from './components/transaction-popup/transaction-popup.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogConfig, MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        TransactionListComponent,
        TransactionPopupComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        HttpClientModule,
        MatCardModule
    ],
    providers: [
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {
                appearance: 'outline',
                floatLabel: 'always'
            }
        },
        {
            provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {
                ...new MatDialogConfig(),
                width: '400px',
                autoFocus: false,
                disableClose: true,
                panelClass: 'popup'
            } as MatDialogConfig
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
