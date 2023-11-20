import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Prontuario } from 'src/app/Classes/Prontuario';
import { ProntuariosService } from 'src/app/Classes/prontuarios.service';
import { Paciente } from 'src/app/Classes/Paciente';
import { PacientesService } from 'src/app/Services/pacientes.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-prontuarios',
  templateUrl: './prontuarios.component.html',
  styleUrls: ['./prontuarios.component.css']
})
export class ProntuariosComponent {
  //Formulários
  formulario: any;
  formularioExclusao: any;
  formularioAtualizar: any;
  formularioSelecionado: string = 'cadastro';

  //Titulos
  tituloFormulario: string = '';
  tituloFormularioAtualizar: string = '';
  tituloFormularioBusca: string = '';
  tituloFormularioExcluir: string = '';

  //Listar
  pacientes: Array<Paciente> | undefined;
  prontuarios!: Prontuario[];
  prontuarioSubject = new BehaviorSubject<Prontuario[]>([]);
  result = this.prontuarioSubject.asObservable();

  constructor(private prontuariosService: ProntuariosService,
    private pacientesService: PacientesService) { }

  ngOnInit(): void {
    this.tituloFormulario = 'Novo Prontuario';
    this.pacientesService.listar().subscribe(pacientes => {
      this.pacientes = pacientes;
      if (this.pacientes && this.pacientes.length > 0) {
        this.formulario.get('PacienteId')?.setValue(this.pacientes[0].id);
      }
    });

    this.formulario = new FormGroup({
      Id: new FormControl(null),
      PacienteId: new FormControl(null),
      DataCriacao: new FormControl(null),
      Diagnostico: new FormControl(null),
      Tratamento: new FormControl(null)
    });

    // Formulário de exclusão
    this.tituloFormularioExcluir = 'Deletando Prontuario'
    this.formularioExclusao = new FormGroup({
      Id: new FormControl(null),
    });

    // Formulário de listar prontuario
    this.exibirProntuario();

    // Formulário de Alterar
    this.tituloFormularioAtualizar = 'Atualizar Prontuario'
    this.formularioAtualizar = new FormGroup({
      Id: new FormControl(null),
      PacienteId: new FormControl(null),
      DataCriacao: new FormControl(null),
      Diagnostico: new FormControl(null),
      Tratamento: new FormControl(null)
    });
  }

  enviarFormulario(): void {
    const prontuario: Prontuario = this.formulario.value;
    this.prontuariosService.cadastrar(prontuario).subscribe(result => {
      alert('Prontuario inserida com sucesso.');
    });
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

  exibirProntuario(): void {
    this.prontuariosService.listar().subscribe(_prontuario => {
      this.prontuarioSubject.next(_prontuario)
    });
  }

  atualizarProntuario(): void {
    const prontuario: Prontuario = this.formularioAtualizar.value;

    this.prontuariosService.atualizar(prontuario).subscribe((result) => {
      alert('Atualizado com sucesso!');
      window.location.reload();
    });
  }

  selecionarFormulario(tipo: string) {
    this.formularioSelecionado = tipo;
  }
}
