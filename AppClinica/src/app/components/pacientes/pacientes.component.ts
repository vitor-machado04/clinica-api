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
  formulario: any;
  tituloFormulario: string = '';
  formularioExclusao: any;
  pacientes!: Paciente[] ;
  pacienteSubject = new BehaviorSubject<Paciente[]>([]);
  result = this.pacienteSubject.asObservable();
  formularioSelecionado: string = 'cadastro'
  
  constructor(private pacientesService : PacientesService) { }

  ngOnInit(): void {
    this.tituloFormulario = 'Novo Paciente';
    this.formulario = new FormGroup({
      Id: new FormControl(null),
      Nome: new FormControl(null),
      Cpf: new FormControl(null)
    });

    // Formulario de exclusão
    this.tituloFormulario = 'Deletando paciente'
    this.formularioExclusao = new FormGroup({
      Id: new FormControl(null),
    });

    //Formulário de listar
    this.exibirPaciente();

  }
  enviarFormulario(): void {
    const paciente : Paciente = this.formulario.value;
    this.pacientesService.cadastrar(paciente).subscribe(result => {
      alert('Paciente inserido com sucesso.');
    })
}

excluirPaciente(): void {
  const idExclusao: number = this.formularioExclusao.get('Id')?.value;

  if(idExclusao) {
    this.pacientesService.excluir(idExclusao).subscribe(result => {
      alert('Paciente excluído com sucesso.')
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

selecionarFormulario(tipo: string) {
  this.formularioSelecionado = tipo;
}

}
