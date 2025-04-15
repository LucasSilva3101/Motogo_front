import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ClientsService } from "src/app/Services/api-client/clients/clients.service";
import { IClientService } from "src/app/Services/api-client/clients/Iclients.service";
import { SERVICES_TOKEN } from "src/app/Services/service.token";
import { SnackbarManagerService } from "src/app/Services/snackbar-manager.service";
import { ISnackbarManagerService } from "src/app/Services/isnackbar-manager.service";
import { ClientModelTable } from "../../clients.model";
import { ClientTableComponent } from "../../components/clients-table/clients-table.component";

@Component({
  selector: 'app-list-clients',
  imports: [ClientTableComponent],
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.scss'],
  providers: [
    { provide: SERVICES_TOKEN.HTTP.CLIENTS, useClass: ClientsService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService }
  ],
  standalone: true
})
export class ListClientsComponent implements OnInit, OnDestroy {

  private httpSubscriptions: Subscription[] = [];
  clients: ClientModelTable[] = [];

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.CLIENTS) private readonly httpService: IClientService,
    @Inject(SERVICES_TOKEN.SNACKBAR) private readonly snackBarManager: ISnackbarManagerService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.httpSubscriptions.push(
      this.httpService.list().subscribe(
        data => {
          this.clients = data;
        },
        error => {
          this.snackBarManager.show('Erro ao carregar a lista de clientes');
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.httpSubscriptions.forEach(s => s.unsubscribe());
  }

  update(client: ClientModelTable): void {
    this.router.navigate(['clients/edit-client', client.id]);
  }

  delete(client: ClientModelTable): void {
    this.httpSubscriptions.push(
      this.httpService.delete(client.id).subscribe(
        () => {
          this.snackBarManager.show(`O cliente ${client.nome} foi excluído com sucesso`);
          this.httpService.list().subscribe(
            data => {
              this.clients = data;
            },
            error => {
              this.snackBarManager.show('Erro ao atualizar a lista de clientes após exclusão');
            }
          );
        },
        error => {
          this.snackBarManager.show('Erro ao excluir cliente');
        }
      )
    );
  }

}
