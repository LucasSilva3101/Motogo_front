import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditClientsComponent } from './Clients/edit_clients/edit-clients/edit-clients.component';
import { NewClientsComponent } from './Clients/new_clients/new-clientes/new-clients.component';
import { ListClientsComponent } from './Clients/list_clients/list-clientes/list-clients.component';

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
  // {
  //   path: 'schedules/month',
  //   component: SchedulesMonthComponent,
  //   data: { title: 'Agendamentos' },
  // },
  { path: '**', redirectTo: 'schedules/month' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
