import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { ClientsService } from "src/app/Services/api-client/clients/clients.service";
import { IClientService } from "src/app/Services/api-client/clients/Iclients.service";
import { ISnackbarManagerService } from "src/app/Services/isnackbar-manager.service";
import { SERVICES_TOKEN } from "src/app/Services/service.token";
import { SnackbarManagerService } from "src/app/Services/snackbar-manager.service";
import { ClientModelForm } from "../../clients.model";
import { ClientsFormComponent } from "../../components/clients-form/clients-form.component";


@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-clients.component.html',
  styleUrls: ['./edit-clients.component.scss'],
  providers: [
    { provide: SERVICES_TOKEN.HTTP.CLIENTS, useClass: ClientsService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService }
  ],
  standalone: true,
  imports: [ClientsFormComponent]
})
export class EditClientsComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();
  
  clients: ClientModelForm = {
    id: 0,
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
    dataNasc: ''
  };

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.CLIENTS) private readonly httpService: IClientService,
    @Inject(SERVICES_TOKEN.SNACKBAR) private readonly snackBarManager: ISnackbarManagerService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!id) {
      this.snackBarManager.show('Erro ao recuperar informações do cliente');
      this.router.navigate(['clients/list']);
      return;
    }

    this.httpService.findById(Number(id)).pipe(takeUntil(this.destroy$)).subscribe(
      data => {
        this.clients = data;
      },
      error => {
        this.snackBarManager.show('Erro ao carregar dados do cliente');
        this.router.navigate(['clients/list']);
      }
    );
  }

  onSubmitClients(value: ClientModelForm): void {
    const { id, ...request } = value;
    if (id) {
      this.httpService.update(id, request).pipe(takeUntil(this.destroy$)).subscribe(
        () => {
          this.snackBarManager.show('Usuário atualizado com sucesso');
          this.router.navigate(['clients/list']);
        },
        error => {
          this.snackBarManager.show('Erro ao atualizar cliente');
        }
      );
      return;
    }

    this.snackBarManager.show('Um erro inesperado aconteceu');
    this.router.navigate(['clients/list']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
