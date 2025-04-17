import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MotosModelForm } from '../../motos.model';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-motos-form',
    imports: [
      FormsModule,
      MatInputModule,
      MatFormFieldModule,
      MatButtonModule,
      CommonModule
    ],
  templateUrl: './motos-form.component.html',
  styleUrls: ['./motos-form.component.scss'],
  standalone: true
})
export class MotosFormComponent {

  @Input() motos: MotosModelForm = {  id: 0, modelo: '', marca: '', precoPorDia: 0 , disponivel: false}

    @Output() motosSubmited = new EventEmitter<MotosModelForm>();

    onSubmit(form: NgForm) {
      if (form.valid) {
        this.motosSubmited.emit(this.motos);
      }
    }

}
