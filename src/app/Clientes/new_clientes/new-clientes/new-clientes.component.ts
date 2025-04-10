import { Component, Inject, OnDestroy } from '@angular/core';
import { ClientsService } from 'src/app/Services/api-client/Clientes/clients.service';
import { IClientService } from 'src/app/Services/api-client/Clientes/Iclients.service';
import { SERVICES_TOKEN } from 'src/app/Services/api-client/service.token';
import { ClientModelForm } from '../../clientes.model';
import { Subscribable, Subscription } from 'rxjs';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-new-clientes',
  templateUrl: './new-clientes.component.html',
  styleUrls: ['./new-clientes.component.scss'],
   providers: [
     {provide: SERVICES_TOKEN.HTTP.CLIENTES, useClass: ClientsService}
   ]
})

export class NewClientesComponent implements OnDestroy {

  private httpSubscription?: Subscription

  constructor(@Inject(SERVICES_TOKEN.HTTP.CLIENTES) private readonly httpService: IClientService,
  private readonly router: Router){}

  ngOnDestroy(): void {
    if(this.httpSubscription) {
      this.httpSubscription.unsubscribe()
    }
  }

  onSubmitClientes (values: ClientModelForm) {
    const {id, ...request} = value
    this.httpSubscription = this.httpService.save{request}.subscribe{_ => {
      this.router.navigate(['clientes/list'])
    }}
  }
}
