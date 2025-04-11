import { Component, Inject, OnDestroy } from '@angular/core';
import { ClientsService } from 'src/app/Services/api-client/Clientes/clients.service';
import { IClientService } from 'src/app/Services/api-client/Clientes/Iclients.service';
import { ClientModelForm } from '../../clientes.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SERVICES_TOKEN } from 'src/app/Services/service.token';

@Component({
  selector: 'app-new-clientes',
  templateUrl: './new-clientes.component.html',
  styleUrls: ['./new-clientes.component.scss'],
  providers: [
    { provide: SERVICES_TOKEN.HTTP.CLIENTES, useClass: ClientsService }
  ]
})
export class NewClientesComponent implements OnDestroy {

  private httpSubscription?: Subscription;

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.CLIENTES) private readonly httpService: IClientService,
    private readonly router: Router
  ) {}

  ngOnDestroy(): void {
    if (this.httpSubscription) {
      this.httpSubscription.unsubscribe();
    }
  }

  onSubmitClientes(values: ClientModelForm): void {
    const { id, ...request } = values;
    this.httpSubscription = this.httpService.save(request).subscribe(_ => {
      this.router.navigate(['clientes/list']);
    });
  }
}
