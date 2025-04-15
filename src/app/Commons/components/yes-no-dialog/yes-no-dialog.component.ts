import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-yes-no-dialog',
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './yes-no-dialog.component.html',
  styleUrls: ['./yes-no-dialog.component.scss'],
  standalone: true
})
export class YesNoDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

}
