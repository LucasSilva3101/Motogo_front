import { Component, Inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SERVICES_TOKEN } from 'src/app/Services/service.token';
import { ClientsService } from 'src/app/Services/api-client/clients/clients.service';
import { IClientService } from 'src/app/Services/api-client/clients/Iclients.service';
import { ClientModelForm } from '../../clients.model';
import { ClientsFormComponent } from "../../components/clients-form/clients-form.component";
import { ISnackbarManagerService } from 'src/app/Services/isnackbar-manager.service';
import { SnackbarManagerService } from '../../../Services/snackbar-manager.service';
@Component({
  selector: 'app-new-clients',
  imports: [
    ClientsFormComponent,
  ],
  templateUrl: './new-clients.component.html',
  styleUrls: ['./new-clients.component.scss'],
  providers: [
    { provide: SERVICES_TOKEN.HTTP.CLIENTS, useClass: ClientsService},
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService},
  ],
  standalone: true
})
export class NewClientsComponent implements OnDestroy {

  private httpSubscription?: Subscription;

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.CLIENTS) private readonly httpService: IClientService,
    @Inject(SERVICES_TOKEN.SNACKBAR) private readonly SnackbarManager: ISnackbarManagerService,
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
      this.SnackbarManager.show('Usuário cadastrado com sucesso')
      this.router.navigate(['clients/list']);
    });
  }
}
