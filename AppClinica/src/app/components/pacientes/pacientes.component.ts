import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PacientesService } from 'src/app/pacientes.service';
import { Paciente } from 'src/app/Paciente';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {
  formulario: any;
  tituloFormulario: string = '';
  
  constructor(private pacientesService : PacientesService) { }

  ngOnInit(): void {
    this.tituloFormulario = 'Novo Paciente';
    this.formulario = new FormGroup({
      Id: new FormControl(null),
      Nome: new FormControl(null),
      Cpf: new FormControl(null)
    })
  }
  enviarFormulario(): void {
    const paciente : Paciente = this.formulario.value;
    this.pacientesService.cadastrar(paciente).subscribe(result => {
      alert('Paciente inserido com sucesso.');
    })
}
}
