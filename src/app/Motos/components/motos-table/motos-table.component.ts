import { AfterViewInit, Component, EventEmitter, Inject, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, MatPaginatorIntl, MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CustomPaginator } from 'src/app/Clients/components/clients-table/custom-paginator';
import { SERVICES_TOKEN } from 'src/app/Services/service.token';
import { DialogManagerService } from 'src/dialog-manager.service';
import { MotosModelTable } from '../../motos.model';
import { Subscription } from 'rxjs';
import { IDialogManagerService } from 'src/idialog-manager.service';
import { YesNoDialogComponent } from 'src/app/Commons/components/yes-no-dialog/yes-no-dialog.component';

@Component({
  selector: 'app-motos-table',
  templateUrl: './motos-table.component.html',
  styleUrls: ['./motos-table.component.scss'],
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
  ],
  standalone: true
})
export class MotosTableComponent implements AfterViewInit, OnChanges, OnDestroy {

  @Input() motos: MotosModelTable[] = [];

  dataSource!: MatTableDataSource<MotosModelTable>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['modelo', 'marca', 'preço por dia', 'disponivel', 'actions'  ];

  private dialogManagerServiceSubscriptions?: Subscription;

  @Output() onConfirmDelete = new EventEmitter<MotosModelTable>();
  @Output() onRequestUpdate = new EventEmitter<MotosModelTable>();

  constructor(
    @Inject(SERVICES_TOKEN.DIALOG) private readonly dialogManagerService: IDialogManagerService
  ) {}

  ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['motos'] && this.motos) {
      this.dataSource = new MatTableDataSource<MotosModelTable>(this.motos);
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

  update(client: MotosModelTable): void {
    this.onRequestUpdate.emit(client);
  }

  delete(moto: MotosModelTable): void {
    this.dialogManagerService.showYesNoDialog(
      YesNoDialogComponent,
      { title: 'Exclusão da moto', content: `Confirma a exclusão da moto ${moto.modelo}` }
    ).subscribe(result => {
      if (result) {
        this.onConfirmDelete.emit(moto);
        const updatedList = this.dataSource.data.filter((c: MotosModelTable) => c.id !== moto.id);
        this.dataSource = new MatTableDataSource<MotosModelTable>(updatedList);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

}
