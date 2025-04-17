import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import { Subscription } from "rxjs";
import { ClientsService } from "src/app/Services/api-client/clients/clients.service";
import { IClientService } from "src/app/Services/api-client/clients/Iclients.service";
import { IScheduleService } from "src/app/Services/api-client/schedules/ischedules.service";
import { SaveScheduleRequest } from "src/app/Services/api-client/schedules/schedule.models";
import { SchedulesService } from "src/app/Services/api-client/schedules/schedules.service";
import { ISnackbarManagerService } from "src/app/Services/isnackbar-manager.service";
import { SERVICES_TOKEN } from "src/app/Services/service.token";
import { SnackbarManagerService } from "src/app/Services/snackbar-manager.service";
import { ScheduleCalendarComponent } from "../components/schedule-calendar/schedule-calendar.component";
import { ScheduleAppointementMonthModel, SelectClientModel, ClientScheduleAppointmentModel, SaveScheduleModel } from "../components/schedule-calendar/schedule.models";


@Component({
  selector: 'app-schedules-month',
  imports: [ScheduleCalendarComponent],
  templateUrl: './schedules-month.component.html',
  styleUrls: ['./schedules-month.component.scss'],
  providers: [
    { provide: SERVICES_TOKEN.HTTP.SCHEDULE, useClass: SchedulesService },
    { provide: SERVICES_TOKEN.HTTP.CLIENTS, useClass: ClientsService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService },
  ],
  standalone: true,
})
export class SchedulesMonthComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  private selectedDate?: Date;

  monthSchedule: ScheduleAppointementMonthModel = {
    scheduledAppointments: [],
    year: 0,
    month: 0
  };
  clients: SelectClientModel[] = [];

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.SCHEDULE)
    private readonly httpService: IScheduleService,
    @Inject(SERVICES_TOKEN.HTTP.CLIENTS)
    private readonly clientHttpService: IClientService,
    @Inject(SERVICES_TOKEN.SNACKBAR)
    private readonly snackbarManage: ISnackbarManagerService
  ) {}

  ngOnInit(): void {
    this.fetchSchedules(new Date());
    this.subscriptions.push(
      this.clientHttpService.list().subscribe((data) => (this.clients = data))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  onDateChange(date: Date) {
    this.selectedDate = date;
    this.fetchSchedules(date);
  }

  onConfirmDelete(schedule: ClientScheduleAppointmentModel) {
    this.subscriptions.push(this.httpService.delete(schedule.id).subscribe());
  }

  onScheduleClient(schedule: SaveScheduleModel) {
    if (schedule.startAt && schedule.endAt && schedule.clientId) {
      const request: SaveScheduleRequest = {
        startAt: schedule.startAt,
        endAt: schedule.endAt,
        clientId: schedule.clientId,
      };
      this.subscriptions.push(
        this.httpService.save(request).subscribe(() => {
          this.snackbarManage.show('Agendamento realizado com sucesso');
          if (this.selectedDate) {
            this.fetchSchedules(this.selectedDate);
          }
        })
      );
    }
  }

  private fetchSchedules(currentDate: Date) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    this.subscriptions.push(
      this.httpService.listInMonth(year, month).subscribe((data) => {
        this.monthSchedule = data || { scheduledAppointments: [] };
        this.buildTable();
      })
    );
  }

  private buildTable() {
    if (!this.monthSchedule || !this.monthSchedule.scheduledAppointments) {
      console.warn("monthSchedule ainda não foi carregado.");
      return;
    }

    console.log("Tabela construída com os dados:", this.monthSchedule.scheduledAppointments);
  }
}
