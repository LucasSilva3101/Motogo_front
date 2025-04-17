import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditClientsComponent } from './Clients/edit_clients/edit-clients/edit-clients.component';
import { NewClientsComponent } from './Clients/new_clients/new-clientes/new-clients.component';
import { ListClientsComponent } from './Clients/list_clients/list-clientes/list-clients.component';
import { ScheduleCalendarComponent } from './Schedules/components/schedule-calendar/schedule-calendar.component';
import { EditMotosComponent } from './Motos/edit_motos/edit-motos/edit-motos.component';
import { ListMotosComponent } from './Motos/list_motos/list-motos/list-motos.component';
import { NewMotosComponent } from './Motos/new_motos/new-motos/new-motos.component';

const routes: Routes = [
  {
    path: 'clients/edit-client/:id',
    component: EditClientsComponent,
    data: { title: 'Atualizar Cliente' },
  },
  {
    path: 'clients/new-client',
    component: NewClientsComponent,
    data: { title: 'Cadastrar Cliente' },
  },
  {
    path: 'clients/list',
    component: ListClientsComponent,
    data: { title: 'Clientes Cadastrados' },
  },


  {
    path: 'motos/edit-moto/:id',
    component: EditMotosComponent,
    data: { title: 'Atualizar Moto' },
  },
  {
    path: 'motos/new-moto',
    component: NewMotosComponent,
    data: { title: 'Cadastrar Moto' },
  },
  {
    path: 'motos/list',
    component: ListMotosComponent,
    data: { title: 'Motos Cadastrados' },
  },


  {
    path: 'schedules/month',
    component: ScheduleCalendarComponent,
    data: { title: 'Agendamentos' },
  },
  { path: '**', redirectTo: 'schedules/month' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
