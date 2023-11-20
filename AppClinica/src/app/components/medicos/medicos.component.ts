import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MedicosService } from 'src/app/Services/medicos.service';
import { Medico } from 'src/app/Classes/Medico';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {
  //Formulários
  formulario: any;
  formularioExclusao: any;
  formularioAtualizar: any;
  formularioSelecionado: string = 'cadastro';
  formularioBusca: any;
  
  //Titulos
  tituloFormulario: string = '';
  tituloFormularioAtualizar: string = '';
  tituloFormularioBusca: string = '';
  tituloFormularioExcluir: string = '';

  //Listar
  medicoSubject = new BehaviorSubject<Medico[]>([]);
  result = this.medicoSubject.asObservable();

  //Buscar
  medicoBuscaSubject = new BehaviorSubject<Medico[]>([]);
  resultBusca = this.medicoBuscaSubject.asObservable();

  
  constructor(private medicosService: MedicosService) { }

  ngOnInit(): void {
    this.tituloFormulario = 'Novo Medico';
    this.formulario = new FormGroup({
      Id: new FormControl(null),
      Name: new FormControl(null),
      Crm: new FormControl(null)
    });

    // Formulário de exclusão
    this.tituloFormularioExcluir = 'Deletando um Medico'
    this.formularioExclusao = new FormGroup({
      Id: new FormControl(null),
    });

    // Formulário de listar
    this.exibirMedico();

    // Formulario de atualizar
    this.tituloFormularioAtualizar = 'Atualizando Medico';
    this.formularioAtualizar = new FormGroup({
      Id: new FormControl(null),
      Name: new FormControl(null),
      Crm: new FormControl(null)
    });

    // Formulário de buscar 
    this.tituloFormularioBusca = 'Buscar Medico'
    this.formularioBusca = new FormGroup ({
      id: new FormControl(null),
    })
  }

  enviarFormulario(): void {
    const medico: Medico = this.formulario.value;
    this.medicosService.cadastrar(medico).subscribe(result => {
      alert('Medico inserido com sucesso.');
    });
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

  exibirMedico(): void {
    this.medicosService.listar().subscribe(_medicos => {
      this.medicoSubject.next(_medicos)
    });
  }

  atualizarMedico(): void {
    const medico: Medico = this.formularioAtualizar.value;
    this.medicosService.atualizar(medico).subscribe(result => {
      alert("Medico atualizado com sucesso!");
    });
  }

  buscarPorId(): void {
    const id: number = this.formularioBusca.get('id')?.value;

    if (id) {
      this.medicosService.buscar(id).subscribe((result) => {
        this.medicoBuscaSubject.next([result]);
      });
    } else {
      alert('Insira um ID válido.');
    }
  }

  selecionarFormulario(tipo: string) {
    this.formularioSelecionado = tipo;
  }
}
