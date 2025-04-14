import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewMotosComponent } from './Motos/new_motos/new-motos/new-motos.component';
import { ListMotosComponent } from './Motos/list_motos/list-motos/list-motos.component';
import { EditMotosComponent } from './Motos/edit_motos/edit-motos/edit-motos.component';
import { EditClientsComponent } from './Clients/edit_clients/edit-clients/edit-clients.component';
import { ListClientsComponent } from './Clients/list_clients/list-clientes/list-clients.component';
import { NewClientsComponent } from './Clients/new_clients/new-clientes/new-clients.component';
import { ClientsFormComponent } from './Clients/components/clients-form/clients-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NewClientsComponent,
    NewMotosComponent,
    ListClientsComponent,
    EditClientsComponent,
    ListMotosComponent,
    EditMotosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ClientsFormComponent
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
