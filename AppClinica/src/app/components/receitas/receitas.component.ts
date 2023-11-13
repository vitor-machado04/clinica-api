import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReceitasService } from 'src/app/Services/receitas.service';
import { Receita } from 'src/app/Classes/Receita';

@Component({
  selector: 'app-receitas',
  templateUrl: './receitas.component.html',
  styleUrls: ['./receitas.component.css']
})
export class ReceitasComponent implements OnInit {
  formulario: any;
  tituloFormulario: string = '';
  formularioExclusao: any;
  formularioSelecionado: string = 'cadastro';

  constructor(private receitasService : ReceitasService) { }

  ngOnInit(): void {
    this.tituloFormulario = 'Nova Receita';
    this.formulario = new FormGroup({
      Id: new FormControl(null),
      Medicamento: new FormControl(null),
      Dosagem: new FormControl(null),
      InstrucoesUso: new FormControl(null),
      DataEmissao: new FormControl(null),
      MedicoId: new FormControl(null) 
    });

    // Formulário de exclusão
    this.tituloFormulario = 'Deletando uma Receita'
    this.formularioExclusao = new FormGroup({
    Id: new FormControl(null),
  });
}

  enviarFormulario(): void {
    const receita : Receita = this.formulario.value;
    this.receitasService.cadastrar(receita).subscribe(result => {
      alert('Receita inserida com sucesso.');
    })
  }

  excluirReceita(): void {
    const idExclusao: number = this.formularioExclusao.get('Id')?.value;

    if (idExclusao) {
      this.receitasService.excluir(idExclusao).subscribe(result => {
        alert('Receita excluída com sucesso.');
      });
    } else {
      alert('Por favor, insira o ID da receita que deseja excluir.');
    }
  }

  selecionarFormulario(tipo: string) {
    this.formularioSelecionado = tipo;
  }
}
