import { InjectionToken } from "@angular/core";
import { IClientService } from "./api-client/Clientes/Iclients.service";
import { IMotoService } from "./api-client/Motos/Imotos.service";


export const SERVICES_TOKEN = {
  HTTP: {
    MOTOS: new InjectionToken<IMotoService>('SERVICES_TOKEN.HTTP.MOTOS'),
    CLIENTES: new InjectionToken<IClientService>('SERVICES_TOKEN.HTTP.CLIENTES'),
    //SCHEDULE: new InjectionToken<IMotoService>('SERVICES_TOKEN.HTTP.SCHEDULE'),
  }
}
