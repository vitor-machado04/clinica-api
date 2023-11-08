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
  formularioExclusao: any;

  constructor(private medicosService : MedicosService) { }

  ngOnInit(): void {
    this.tituloFormulario = 'Novo Medico';
    this.formulario = new FormGroup({
      Id: new FormControl(null),
      Name: new FormControl(null),
      Crm: new FormControl(null)
    })

    // Formulário de exclusão
    this.tituloFormulario = 'Deletando um Medico'
    this.formularioExclusao = new FormGroup({
    Id: new FormControl(null),
  });

  }
  enviarFormulario(): void {
    const medico : Medico = this.formulario.value;
    this.medicosService.cadastrar(medico).subscribe(result => {
      alert('Medico inserido com sucesso.');
    })
  }

  excluirMedico(): void {
    const idExclusao: number = this.formularioExclusao.get('Id')?.value;

    if (idExclusao) {
      this.medicosService.excluir(idExclusao).subscribe(result => {
        alert('Médico excluído com sucesso.');
      });
    } else {
      alert('Por favor, insira o ID do médico que deseja excluir.');
    }
  }
}
