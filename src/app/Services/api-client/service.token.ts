import { InjectionToken } from "@angular/core";
import { IMotoService } from "./Motos/Imotos.service";
import { IClientService } from "./Clientes/Iclients.service";

export const SERVICES_TOKEN = {
  HTTP: {
    MOTOS: new InjectionToken<IMotoService>('SERVICES_TOKEN.HTTP.MOTOS'),
    CLIENTES: new InjectionToken<IClientService>('SERVICES_TOKEN.HTTP.CLIENTES'),
    //SCHEDULE: new InjectionToken<IMotoService>('SERVICES_TOKEN.HTTP.SCHEDULE'),
  }
}
