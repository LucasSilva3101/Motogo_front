import { ComponentType } from "@angular/cdk/portal";
import { Observable } from "rxjs";
import { YesNoDialogComponent } from "./app/Commons/components/yes-no-dialog/yes-no-dialog.component";

export interface IDialogManagerService {
  showYesNoDialog(
    component: ComponentType<YesNoDialogComponent>,
    data: { title: string, content: string }
  ): Observable<any>;

}
