import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReceitasService } from 'src/app/Services/receitas.service';
import { Receita } from 'src/app/Classes/Receita';
import { Medico } from 'src/app/Classes/Medico';
import { MedicosService } from 'src/app/Services/medicos.service';

@Component({
  selector: 'app-receitas',
  templateUrl: './receitas.component.html',
  styleUrls: ['./receitas.component.css']
})
export class ReceitasComponent implements OnInit {
  //Formulário
  formulario: any;
  formularioExclusao: any;
  formularioSelecionado: string = 'cadastro';

  //Titulos
  tituloFormulario: string = '';
  tituloFormularioAtualizar: string = '';
  tituloFormularioBusca: string = '';
  tituloFormularioExcluir: string = '';

  //Listar
  medicos: Array<Medico> | undefined;

  constructor(private receitasService : ReceitasService,
              private medicosService : MedicosService) { }

  ngOnInit(): void {
    this.tituloFormulario = 'Nova Receita';
    this.medicosService.listar().subscribe(medicos => {
      this.medicos = medicos;
      if (this.medicos && this.medicos.length > 0) {
        this.formulario.get('MedicoId')?.setValue(this.medicos[0].id);
      }
    });

    this.formulario = new FormGroup({
      Id: new FormControl(null),
      Medicamento: new FormControl(null),
      Dosagem: new FormControl(null),
      InstrucoesUso: new FormControl(null),
      DataEmissao: new FormControl(null),
      MedicoId: new FormControl(null) 
    });

    // Formulário de exclusão
    this.tituloFormularioExcluir = 'Deletando uma Receita'
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
