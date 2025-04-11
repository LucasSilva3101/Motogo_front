import { Component, Inject } from '@angular/core';
import { IMotoService } from 'src/app/Services/api-client/Motos/Imotos.service';
import { MotosService } from 'src/app/Services/api-client/Motos/motos.service';
import { SERVICES_TOKEN } from 'src/app/Services/service.token';


@Component({
  selector: 'app-edit-motos',
  templateUrl: './edit-motos.component.html',
  styleUrls: ['./edit-motos.component.scss'],
  providers: [
    {provide: SERVICES_TOKEN.HTTP.MOTOS, useClass: MotosService}
  ]
})
export class EditMotosComponent {

  constructor(@Inject(SERVICES_TOKEN.HTTP.MOTOS) private readonly httpService: IMotoService){}

}
