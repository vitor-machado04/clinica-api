import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Prontuario } from 'src/app/Classes/Prontuario';
import { ProntuariosService } from 'src/app/Classes/prontuarios.service';

@Component({
  selector: 'app-prontuarios',
  templateUrl: './prontuarios.component.html',
  styleUrls: ['./prontuarios.component.css']
})
export class ProntuariosComponent {
  formulario: any;
  tituloFormulario: string = '';
  formularioExclusao: any;
  formularioSelecionado: string = 'cadastro';

  constructor(private prontuariosService : ProntuariosService) { }

  ngOnInit(): void {
    this.tituloFormulario = 'Novo Prontuario';
    this.formulario = new FormGroup({
      Id: new FormControl(null),
      PacienteId: new FormControl(null),
      DataCriacao: new FormControl(null),
      Diagnostico: new FormControl(null),
      Tratamento: new FormControl(null)
    });

    // Formulário de exclusão
    this.tituloFormulario = 'Deletando Prontuario'
    this.formularioExclusao = new FormGroup({
      Id: new FormControl(null),
    })
  }
  enviarFormulario(): void {
    const prontuario : Prontuario = this.formulario.value;
    this.prontuariosService.cadastrar(prontuario).subscribe(result => {
      alert('Prontuario inserida com sucesso.');
    })
  }

  excluirProntuario(): void {
    const idExclusao: number = this.formularioExclusao.get('Id')?.value;

    if (idExclusao) {
      this.prontuariosService.excluir(idExclusao).subscribe(result => {
        alert('Prontuario excluída com sucesso.');
      });
    } else {
      alert('Por favor, insira o ID da prontuario que deseja excluir.');
    }
  }

  selecionarFormulario(tipo: string) {
    this.formularioSelecionado = tipo;
  }
}
