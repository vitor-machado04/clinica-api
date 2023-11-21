import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PacientesService } from 'src/app/Services/pacientes.service';
import { Paciente } from 'src/app/Classes/Paciente';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {
  //Formulários
  formulario: any;
  formularioExclusao: any;
  formularioAlterar: any;
  formularioBuscar: any;
  formularioSelecionado: string = 'cadastro'

  //Titulos
  tituloFormulario: string = '';
  tituloFormularioAtualizar: string = '';
  tituloFormularioBuscar: string = '';
  tituloFormularioExcluir: string = '';

  //Listar
  pacientes!: Paciente[];
  pacienteSubject = new BehaviorSubject<Paciente[]>([]);
  result = this.pacienteSubject.asObservable();

  //Buscar
  pacientesBuscar!: Paciente[];
  pacienteBuscaSubject = new BehaviorSubject<Paciente[]>([]);
  resultBusca = this.pacienteBuscaSubject.asObservable();

  constructor(private pacientesService: PacientesService) { }

  ngOnInit(): void {
    this.tituloFormulario = 'Novo Paciente';
    this.formulario = new FormGroup({
      Id: new FormControl(null),
      Nome: new FormControl(null),
      Cpf: new FormControl(null)
    });

    // Formulario de exclusão
    this.tituloFormularioExcluir = 'Deletando paciente'
    this.formularioExclusao = new FormGroup({
      Id: new FormControl(null),
    });

    //Formulário de listar
    this.exibirPaciente();

    //Formulário de alterar
    this.tituloFormularioAtualizar = 'Atualizando Paciente'
    this.formularioAlterar = new FormGroup({
      Id: new FormControl(null),
      Nome: new FormControl(null),
      Cpf: new FormControl(null)
    });

    //Formulário de busca
    this.tituloFormularioBuscar = 'Buscar Paciente por ID:'
    this.formularioBuscar = new FormGroup({
      id: new FormControl(null),
    });
  }
  
  enviarFormulario(): void {
    const paciente: Paciente = this.formulario.value;
    this.pacientesService.cadastrar(paciente).subscribe(result => {
      alert('Paciente inserido com sucesso.');
      window.location.reload();
    })
  }

  excluirPaciente(): void {
    const idExclusao: number = this.formularioExclusao.get('Id')?.value;

    if (idExclusao) {
      this.pacientesService.excluir(idExclusao).subscribe(result => {
        alert('Paciente excluído com sucesso.')
        window.location.reload();
      });
    } else {
      alert('Por favor, insira o ID do paciente que deseja excluir.');
    }
  }

  exibirPaciente(): void {
    this.pacientesService.listar().subscribe(_pacientes => {
      this.pacienteSubject.next(_pacientes)
    });
  }

  atualizarPaciente(): void {
    const paciente: Paciente = this.formularioAlterar.value;
    this.pacientesService.atualizar(paciente).subscribe(result => {
      alert("Paciente atualizado com sucesso!");
      window.location.reload();
    });
  }

  buscarPorId(): void {
    const id: number = this.formularioBuscar.get('id')?.value;

    if (id) {
      this.pacientesService.buscar(id).subscribe((result) => {
        this.pacienteBuscaSubject.next([result]);
      });
    } else {
      alert('Insira um ID válido.');
    }
  }

  selecionarFormulario(tipo: string) {
    this.formularioSelecionado = tipo;
  }

}
