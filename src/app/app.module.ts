import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewMotosComponent } from './Motos/new_motos/new-motos/new-motos.component';
import { ListMotosComponent } from './Motos/list_motos/list-motos/list-motos.component';
import { EditMotosComponent } from './Motos/edit_motos/edit-motos/edit-motos.component';

import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MenuBarComponent } from './Commons/components/menu-bar/menu-bar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MotosFormComponent } from './Motos/components/motos-form/motos-form.component';
import { LandingPageComponent } from './Commons/components/landing-page/landing-page.component';
import { LoginPageComponent } from './Commons/components/login-page/login-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NewMotosComponent,
    ListMotosComponent,
    MenuBarComponent,
    LandingPageComponent,
    LoginPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
    MatMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
