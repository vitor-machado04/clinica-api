import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConsultasService } from './../../consultas.service';
import { Consulta } from 'src/app/Consulta';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent {
  formulario: any;
  tituloFormulario: string = '';

  constructor(private consultasService : ConsultasService) { }

  ngOnInit(): void {
    this.tituloFormulario = 'Nova Consulta';
    this.formulario = new FormGroup({
      Id: new FormControl(null),
      PacienteId: new FormControl(null),
      MedicoId: new FormControl(null),
      Razao: new FormControl(null),
      DataHora: new FormControl(null)
    })
  }
  enviarFormulario(): void {
    const consulta : Consulta = this.formulario.value;
    this.consultasService.cadastrar(consulta).subscribe(result => {
      alert('Consulta inserida com sucesso.');
    })
  }
}
