import { CommonModule } from "@angular/common";
import { Component, OnDestroy, AfterViewInit, OnChanges, Input, Output, EventEmitter, ViewChild, Inject, SimpleChanges } from "@angular/core";
import { FormsModule, FormControl, NgForm } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule, MatPaginator } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule, MatTableDataSource } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Subject, observable, takeUntil } from "rxjs";
import { YesNoDialogComponent } from "src/app/Commons/components/yes-no-dialog/yes-no-dialog.component";
import { SERVICES_TOKEN } from "src/app/Services/service.token";
import { DialogManagerService } from "src/dialog-manager.service";
import { IDialogManagerService } from "src/idialog-manager.service";
import { ClientScheduleAppointmentModel, SaveScheduleModel, ScheduleAppointementMonthModel, SelectClientModel } from "./schedule.models";
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';


   @Component({
     selector: 'app-schedule-calendar',
     imports: [
       CommonModule,
       FormsModule,
       MatDatepickerModule,
       MatCardModule,
       MatTableModule,
       MatButtonModule,
       MatIconModule,
       MatPaginatorModule,
       MatTooltipModule,
       MatDatepickerModule,
       MatInputModule,
       MatFormFieldModule,
       MatSelectModule,
       NgxMatTimepickerModule
     ],
     templateUrl: './schedule-calendar.component.html',
     styleUrls: ['./schedule-calendar.component.scss'],
     providers: [
      {
        provide: SERVICES_TOKEN.DIALOG, useClass: DialogManagerService
      }
    ],
     standalone: true
   })
   export class ScheduleCalendarComponent implements OnDestroy, AfterViewInit, OnChanges {
     private _unsubscribe$ = new Subject<void>();

     private _selected: Date = new Date();

     displayedColumns: string[] = ['startAt', 'endAt', 'client', 'actions'];

     dataSource: MatTableDataSource<ClientScheduleAppointmentModel> = new MatTableDataSource<ClientScheduleAppointmentModel>();

     addingSchedule: boolean = false;

     newSchedule: SaveScheduleModel = { startAt: undefined, endAt: undefined, clientId: undefined };

     clientSelectFormControl = new FormControl();

     @Input() monthSchedule!: ScheduleAppointementMonthModel;
     @Input() clients: SelectClientModel[] = [];

     @Output() onDateChange = new EventEmitter<Date>();
     @Output() onConfirmDelete = new EventEmitter<ClientScheduleAppointmentModel>();
     @Output() onScheduleClient = new EventEmitter<SaveScheduleModel>();

     @ViewChild(MatPaginator) paginator!: MatPaginator;

     constructor(@Inject(SERVICES_TOKEN.DIALOG) private readonly dialogManagerService: IDialogManagerService) {}

     get selected(): Date {
       return this._selected;
     }

     set selected(selected: Date) {
       if (this._selected.getTime() !== selected.getTime()) {
         this.onDateChange.emit(selected);
         this.buildTable();
         this._selected = selected;
       }
     }

     ngOnDestroy(): void {
       this._unsubscribe$.next();
       this._unsubscribe$.complete();
     }

     ngAfterViewInit(): void {
       if (this.dataSource && this.paginator) {
         this.dataSource.paginator = this.paginator;
       }
     }

     ngOnChanges(changes: SimpleChanges): void {
       if (changes['monthSchedule'] && this.monthSchedule) {
         this.buildTable();
       }
     }

     onSubmit(form: NgForm): void {
       const startAt = new Date(this._selected);
       const endAt = new Date(this._selected);
       startAt.setHours(this.newSchedule.startAt!.getHours(), this.newSchedule.startAt!.getMinutes());
       endAt.setHours(this.newSchedule.endAt!.getHours(), this.newSchedule.endAt!.getMinutes());

       const saved: ClientScheduleAppointmentModel = {
         id: -1,
         day: this._selected.getDate(),
         startAt,
         endAt,
         clientId: this.newSchedule.clientId!,
         clientName: this.clients.find(c => c.id === this.newSchedule.clientId!)!.nome,
       };

       this.monthSchedule.scheduledAppointments.push(saved);
       this.onScheduleClient.emit(saved);
       this.buildTable();
       form.resetForm();
       this.newSchedule = { startAt: undefined, endAt: undefined, clientId: undefined };
     }

     requestDelete(schedule: ClientScheduleAppointmentModel): void {
       this.dialogManagerService
         .showYesNoDialog(YesNoDialogComponent, { title: 'Exclusão de agendamento', content: 'Confirma a exclusão do agendamento?' })
         .pipe(takeUntil(this._unsubscribe$))
         .subscribe(result => {
           if (result) {
             this.onConfirmDelete.emit(schedule);
             this.dataSource.data = this.dataSource.data.filter(c => c.id !== schedule.id);
           }
         });
     }

     onTimeChange(time: Date): void {
       const endAt = new Date(time);
       endAt.setHours(time.getHours() + 1);
       this.newSchedule.endAt = endAt;
     }

     private buildTable(): void {
       const appointments = this.monthSchedule.scheduledAppointments.filter(a =>
         this.monthSchedule.year === this._selected.getFullYear() &&
         this.monthSchedule.month - 1 === this._selected.getMonth() &&
         a.day === this._selected.getDate()
       );
       this.dataSource = new MatTableDataSource<ClientScheduleAppointmentModel>(appointments);
       if (this.paginator) {
         this.dataSource.paginator = this.paginator;
       }
     }
   }

