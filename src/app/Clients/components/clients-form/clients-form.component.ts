import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClientModelForm } from '../../clients.model';
import { FormsModule, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clients-form',
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl:'./clients-form.component.html',
  styleUrls: ['./clients-form.component.scss'],
  standalone: true
})
export class ClientsFormComponent {

  @Input() clients: ClientModelForm = {  id: 0, nome: '', email: '', telefone:'' , endereco:'', dataNasc:''}

  @Output() clientsSubmited = new EventEmitter<ClientModelForm>();

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.clientsSubmited.emit(this.clients);
    }
  }


}
