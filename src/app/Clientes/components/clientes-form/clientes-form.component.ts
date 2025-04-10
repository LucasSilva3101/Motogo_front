import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClientModelForm } from '../../clientes.model';
import { FormsModule, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-clientes-form',
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    NgxMaskDirective
  ],
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.scss'],
  standalone: true
})
export class ClientesFormComponent {

  @Input() clientes: ClientModelForm = {  id: 0, nome: '', email: '', telefone:'' , endereco:'', dataNasc:''}

  @Output() clientesSubmited = new EventEmitter<ClientModelForm>();

  onSubmit(_: NgForm) {
    this.clientesSubmited.emit(this.clientes)
  }

}
