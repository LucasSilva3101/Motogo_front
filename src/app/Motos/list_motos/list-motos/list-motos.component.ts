import { Component, Inject } from '@angular/core';
import { IMotoService } from 'src/app/Services/api-client/Motos/Imotos.service';
import { MotosService } from 'src/app/Services/api-client/Motos/motos.service';
import { SERVICES_TOKEN } from 'src/app/Services/api-client/service.token';

@Component({
  selector: 'app-list-motos',
  templateUrl: './list-motos.component.html',
  styleUrls: ['./list-motos.component.sass'],
  providers: [
    {provide: SERVICES_TOKEN.HTTP.MOTOS, useClass: MotosService}
  ]
})
export class ListMotosComponent {

  constructor(@Inject(SERVICES_TOKEN.HTTP.MOTOS) private readonly httpService: IMotoService){}

}
