import {
  AfterViewInit,
  OnChanges,
  OnDestroy,
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';

import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Subscription } from 'rxjs';
import { YesNoDialogComponent } from 'src/app/Commons/components/yes-no-dialog/yes-no-dialog.component';
import { SERVICES_TOKEN } from 'src/app/Services/service.token';
import { DialogManagerService } from 'src/dialog-manager.service';
import { IDialogManagerService } from 'src/idialog-manager.service';
import { ClientModelTable } from '../../clients.model';
import { CustomPaginator } from './custom-paginator';


@Component({
  selector: 'app-client-table',
  standalone: true,
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.scss'],
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatTooltipModule
  ],
  providers: [
    { provide: SERVICES_TOKEN.DIALOG, useClass: DialogManagerService },
    { provide: MatPaginatorIntl, useClass: CustomPaginator }
  ]
})
export class ClientTableComponent implements AfterViewInit, OnChanges, OnDestroy {

  @Input() clients: ClientModelTable[] = [];

  dataSource!: MatTableDataSource<ClientModelTable>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['nome', 'email', 'telefone', 'endereco', 'dataNasc', 'actions'  ];

  private dialogManagerServiceSubscriptions?: Subscription;

  @Output() onConfirmDelete = new EventEmitter<ClientModelTable>();
  @Output() onRequestUpdate = new EventEmitter<ClientModelTable>();

  constructor(
    @Inject(SERVICES_TOKEN.DIALOG) private readonly dialogManagerService: IDialogManagerService
  ) {}

  ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clients'] && this.clients) {
      this.dataSource = new MatTableDataSource<ClientModelTable>(this.clients);
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    }
  }

  ngOnDestroy(): void {
    if (this.dialogManagerServiceSubscriptions) {
      this.dialogManagerServiceSubscriptions.unsubscribe();
    }
  }

  formatPhone(phone: string): string {
    return `( ${phone.substring(0, 2)} ) ${phone.substring(2, 7)} - ${phone.substring(7)}`;
  }

  update(client: ClientModelTable): void {
    this.onRequestUpdate.emit(client);
  }

  delete(client: ClientModelTable): void {
    this.dialogManagerService.showYesNoDialog(
      YesNoDialogComponent,
      { title: 'Exclusão de cliente', content: `Confirma a exclusão do cliente ${client.nome}` }
    ).subscribe(result => {
      if (result) {
        this.onConfirmDelete.emit(client);
        const updatedList = this.dataSource.data.filter((c: ClientModelTable) => c.id !== client.id);
        this.dataSource = new MatTableDataSource<ClientModelTable>(updatedList);
        this.dataSource.paginator = this.paginator;
      }
    });
  }
}
