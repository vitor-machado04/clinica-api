import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReceitasService } from 'src/app/Services/receitas.service';
import { Receita } from 'src/app/Classes/Receita';
import { Medico } from 'src/app/Classes/Medico';
import { MedicosService } from 'src/app/Services/medicos.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-receitas',
  templateUrl: './receitas.component.html',
  styleUrls: ['./receitas.component.css']
})
export class ReceitasComponent implements OnInit {
  //Formulário
  formulario: any;
  formularioExclusao: any;
  formularioBuscar: any;
  formularioAtualizar: any;
  formularioSelecionado: string = 'cadastro';

  //Titulos
  tituloFormulario: string = '';
  tituloFormularioAtualizar: string = '';
  tituloFormularioBuscar: string = '';
  tituloFormularioExcluir: string = '';

  //Listar
  medicos: Array<Medico> | undefined;
  receitas!: Receita[] ;
  receitaSubject = new BehaviorSubject<Receita[]>([]);
  result = this.receitaSubject.asObservable();

  //Buscar
  receitaBuscar!: Receita[];
  receitaBuscaSubject = new BehaviorSubject<Receita[]>([]);
  resultBusca = this.receitaBuscaSubject.asObservable();

  constructor(private receitasService : ReceitasService,
              private medicosService : MedicosService) { }

  ngOnInit(): void {
    this.tituloFormulario = 'Nova Receita';
    this.medicosService.listar().subscribe(medicos => {
      this.medicos = medicos;
      if (this.medicos && this.medicos.length > 0) {
        this.formulario.get('IdMedico')?.setValue(this.medicos[0].id);
      }
    });

    this.formulario = new FormGroup({
      Id: new FormControl(null),
      Medicamento: new FormControl(null),
      Dosagem: new FormControl(null),
      InstrucoesUso: new FormControl(null),
      DataEmissao: new FormControl(null),
      IdMedico: new FormControl(null)
    });

    // Formulário de exclusão
    this.tituloFormularioExcluir = 'Deletando uma Receita'
    this.formularioExclusao = new FormGroup({
    Id: new FormControl(null),
  });

    //Formulário de busca
    this.tituloFormularioBuscar = 'Buscar Receita por ID:'
    this.formularioBuscar = new FormGroup({
      id: new FormControl(null),
    });

    // Formulário de Listar
    this.exibirReceita();

    // Formulário de atualizar
    this.tituloFormularioAtualizar = 'Atualizando Receita'
    this.formularioAtualizar = new FormGroup ({
      Id: new FormControl(null),
      Medicamento: new FormControl(null),
      Dosagem: new FormControl(null),
      InstrucoesUso: new FormControl(null),
      DataEmissao: new FormControl(null),
      IdMedico: new FormControl(null)
    })
}

  enviarFormulario(): void {
    const receita : Receita = this.formulario.value;
    this.receitasService.cadastrar(receita).subscribe(result => {
      alert('Receita inserida com sucesso.');
      window.location.reload();
    });
  }

  excluirReceita(): void {
    const idExclusao: number = this.formularioExclusao.get('Id')?.value;

    if (idExclusao) {
      this.receitasService.excluir(idExclusao).subscribe(result => {
        window.location.reload();
        alert('Receita excluída com sucesso.');
      });
    } else {
      alert('Por favor, insira o ID da receita que deseja excluir.');
    }
  }

  buscarPorId(): void {
    const id: number = this.formularioBuscar.get('id')?.value;

    if (id) {
      this.receitasService.buscar(id).subscribe((result) => {
        this.receitaBuscaSubject.next([result]);
      });
    } else {
      alert('Insira um ID válido.');
    }
  }

  exibirReceita(): void {
    this.receitasService.listar().subscribe(_receitas => {
      this.receitaSubject.next(_receitas)
    });
  }

  atualizarReceita(): void {
    const receita: Receita = this.formularioAtualizar.value;

    this.receitasService.atualizar(receita).subscribe((result) => {
      alert('Atualizado com sucesso!');
      window.location.reload();
    });
  }

  selecionarFormulario(tipo: string) {
    this.formularioSelecionado = tipo;
  }
}
