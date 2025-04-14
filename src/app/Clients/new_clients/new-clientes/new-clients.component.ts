import { Component, Inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SERVICES_TOKEN } from 'src/app/Services/service.token';
import { ClientsService } from 'src/app/Services/api-client/clients/clients.service';
import { IClientService } from 'src/app/Services/api-client/clients/Iclients.service';
import { ClientModelForm } from '../../clients.model';
import { ClientsFormComponent } from "../../components/clients-form/clients-form.component";

@Component({
  selector: 'app-new-clients',
  templateUrl: './new-clients.component.html',
  styleUrls: ['./new-clients.component.scss'],
  providers: [
    { provide: SERVICES_TOKEN.HTTP.CLIENTS, useClass: ClientsService }
  ],
})
export class NewClientsComponent implements OnDestroy {

  private httpSubscription?: Subscription;

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.CLIENTS) private readonly httpService: IClientService,
    private readonly router: Router
  ) {}

  ngOnDestroy(): void {
    if (this.httpSubscription) {
      this.httpSubscription.unsubscribe();
    }
  }

  onSubmitClients(values: ClientModelForm): void {
    const { id, ...request } = values;
    this.httpSubscription = this.httpService.save(request).subscribe(_ => {
      this.router.navigate(['clients/list']);
    });
  }
}
