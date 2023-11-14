import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConsultasService } from '../../Services/consultas.service';
import { Consulta } from 'src/app/Classes/Consulta';
import { Medico } from 'src/app/Classes/Medico';
import { MedicosService } from 'src/app/Services/medicos.service';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent {
  formulario: any;
  tituloFormulario: string = '';
  formularioExclusao: any;
  medicos: Array<Medico> | undefined;
  formularioSelecionado: string = 'cadastro';

  constructor(private consultasService : ConsultasService,
              private medicosService : MedicosService) { }

  ngOnInit(): void {
    this.tituloFormulario = 'Nova Consulta';
    this.medicosService.listar().subscribe(medicos => {
      this.medicos = medicos;
      console.log('Medicos:', this.medicos);
      if (this.medicos && this.medicos.length > 0) {
        this.formulario.get('MedicoId')?.setValue(this.medicos[0].Id);
      //   this.medicos = [
      //     { Id: 1, Name: 'Vitor', Crm: '14141414' },
      //     { Id: 2, Name: 'Teste', Crm: '1212121212' }
      // ];
      }
    });
    this.formulario = new FormGroup({
      Id: new FormControl(null),
      PacienteId: new FormControl(null),
      MedicoId: new FormControl(null),
      Razao: new FormControl(null),
      DataHora: new FormControl(null)
    });

    // Formulário de exclusão
    this.tituloFormulario = 'Deletando Consulta'
    this.formularioExclusao = new FormGroup({
      Id: new FormControl(null),
    })
  }
  enviarFormulario(): void {
    const consulta : Consulta = this.formulario.value;
    this.consultasService.cadastrar(consulta).subscribe(result => {
      alert('Consulta inserida com sucesso.');
    })
  }

  excluirConsulta(): void {
    const idExclusao: number = this.formularioExclusao.get('Id')?.value;

    if (idExclusao) {
      this.consultasService.excluir(idExclusao).subscribe(result => {
        alert('Consulta excluída com sucesso.');
      });
    } else {
      alert('Por favor, insira o ID da consulta que deseja excluir.');
    }
  }

  selecionarFormulario(tipo: string) {
    this.formularioSelecionado = tipo;
  }
}
