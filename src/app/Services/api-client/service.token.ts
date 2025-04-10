import { InjectionToken } from "@angular/core";
import { IMotoService } from "./Motos/Imotos.service";

export const SERVICES_TOKEN = {
  HTTP: {
    MOTOS: new InjectionToken<IMotoService>('SERVICES_TOKEN.HTTP.MOTOS'),
    //SCHEDULE: new InjectionToken<IMotoService>('SERVICES_TOKEN.HTTP.SCHEDULE'),
  }
}