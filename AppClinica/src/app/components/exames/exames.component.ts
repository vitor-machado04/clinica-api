import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ExamesService } from 'src/app/exames.service';
import { Exame } from 'src/app/Exame';

@Component({
  selector: 'app-exames',
  templateUrl: './exames.component.html',
  styleUrls: ['./exames.component.css']
})
export class ExamesComponent {
  formulario: any;
  tituloFormulario: string = '';

  constructor(private examesService : ExamesService) { }

  ngOnInit(): void {
    this.tituloFormulario = 'Nova Exame';
    this.formulario = new FormGroup({
      Id: new FormControl(null),
      Nome: new FormControl(null),
      Data: new FormControl(null),
      Resultado: new FormControl(null),
      PacienteId: new FormControl(null)
    })
  }
  enviarFormulario(): void {
    const exame : Exame = this.formulario.value;
    this.examesService.cadastrar(exame).subscribe(result => {
      alert('Exame inserido com sucesso.');
    })
  }
}
