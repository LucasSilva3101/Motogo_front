import { Component, Inject } from '@angular/core';
import { IMotoService } from 'src/app/Services/api-client/Motos/Imotos.service';
import { MotosService } from 'src/app/Services/api-client/Motos/motos.service';
import { SERVICES_TOKEN } from 'src/app/Services/service.token';
import { SnackbarManagerService } from 'src/app/Services/snackbar-manager.service';
import { MotosFormComponent } from '../../components/motos-form/motos-form.component';
import { ISnackbarManagerService } from 'src/app/Services/isnackbar-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MotosModelForm } from '../../motos.model';


@Component({
  selector: 'app-edit-motos',
  templateUrl: './edit-motos.component.html',
  styleUrls: ['./edit-motos.component.scss'],
  providers: [
    {provide: SERVICES_TOKEN.HTTP.MOTOS, useClass: MotosService},
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService }
  ],
  standalone: true,
    imports: [MotosFormComponent]
})
export class EditMotosComponent {

  private destroy$ = new Subject<void>();

  motos: MotosModelForm = {
    id: 0,
    modelo: '',
    marca: '',
    precoPorDia: 0 ,
    disponivel: false}

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.MOTOS) private readonly httpService: IMotoService,
    @Inject(SERVICES_TOKEN.SNACKBAR) private readonly snackBarManager: ISnackbarManagerService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      if (!id) {
        this.snackBarManager.show('Erro ao recuperar informações do cliente');
        this.router.navigate(['motos/list']);
        return;
      }

      this.httpService.findById(Number(id)).pipe(takeUntil(this.destroy$)).subscribe(
        data => {
          this.motos = data;
        },
        error => {
          this.snackBarManager.show('Erro ao carregar dados da moto');
          this.router.navigate(['motos/list']);
        }
      );
    }

    onSubmitMotos(value: MotosModelForm): void {
      const { id, ...request } = value;
      if (id) {
        this.httpService.update(id, request).pipe(takeUntil(this.destroy$)).subscribe(
          () => {
            this.snackBarManager.show('Moto atualizada com sucesso');
            this.router.navigate(['clients/list']);
          },
          error => {
            this.snackBarManager.show('Erro ao atualizar moto');
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
