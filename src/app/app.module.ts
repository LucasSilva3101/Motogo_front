import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewClientesComponent } from './Clientes/new_clientes/new-clientes/new-clientes.component';
import { NewMotosComponent } from './Motos/new_motos/new-motos/new-motos.component';
import { ListClientesComponent } from './Clientes/list_clientes/list-clientes/list-clientes.component';
import { EditClientesComponent } from './Clientes/edit_clientes/edit-clientes/edit-clientes.component';
import { ListMotosComponent } from './Motos/list_motos/list-motos/list-motos.component';
import { EditMotosComponent } from './Motos/edit_motos/edit-motos/edit-motos.component';
import { ClientesFormComponent } from './Clientes/components/clientes-form/clientes-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NewClientesComponent,
    NewMotosComponent,
    ListClientesComponent,
    EditClientesComponent,
    ListMotosComponent,
    EditMotosComponent,
    ClientesFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ClientesFormComponent
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
