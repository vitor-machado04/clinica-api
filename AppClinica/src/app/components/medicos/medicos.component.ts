import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MedicosService } from 'src/app/medicos.service';
import { Medico } from 'src/app/Medico';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {
  formulario: any;
  tituloFormulario: string = '';
  
  constructor(private medicosService : MedicosService) { }

  ngOnInit(): void {
    this.tituloFormulario = 'Novo Medico';
    this.formulario = new FormGroup({
      Id: new FormControl(null),
      Name: new FormControl(null),
      Crm: new FormControl(null)
    })
  }
  enviarFormulario(): void {
    const medico : Medico = this.formulario.value;
    this.medicosService.cadastrar(medico).subscribe(result => {
      alert('Medico inserido com sucesso.');
    })
  } 
}
