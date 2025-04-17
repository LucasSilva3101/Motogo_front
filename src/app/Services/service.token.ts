import { InjectionToken } from "@angular/core";
import { IMotoService } from "./api-client/Motos/Imotos.service";
import { IClientService } from "./api-client/clients/Iclients.service";
import { ISnackbarManagerService } from "./isnackbar-manager.service";
import { IDialogManagerService } from "src/idialog-manager.service";
import { IScheduleService } from "./api-client/schedules/ischedules.service";


export const SERVICES_TOKEN = {
  HTTP: {
    MOTOS: new InjectionToken<IMotoService>('SERVICES_TOKEN.HTTP.MOTOS'),
    CLIENTS: new InjectionToken<IClientService>('SERVICES_TOKEN.HTTP.CLIENTS'),
    SCHEDULE: new InjectionToken<IScheduleService>('SERVICES_TOKEN.HTTP.SCHEDULE'),
  },
  SNACKBAR: new InjectionToken<ISnackbarManagerService>('SERVICES_TOKEN.SNACKBAR'),

  DIALOG: new InjectionToken<IDialogManagerService>('SERVICES_TOKEN.DIALOG')
}
