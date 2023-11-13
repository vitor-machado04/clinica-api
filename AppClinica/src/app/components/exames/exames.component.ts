import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ExamesService } from 'src/app/Services/exames.service';
import { Exame } from 'src/app/Classes/Exame';

@Component({
  selector: 'app-exames',
  templateUrl: './exames.component.html',
  styleUrls: ['./exames.component.css']
})
export class ExamesComponent implements OnInit {
  formulario: any;
  tituloFormulario: string = '';
  formularioExclusao: any;
  formularioSelecionado: string = 'cadastro';

  constructor(private examesService : ExamesService) { }

  ngOnInit(): void {
    this.tituloFormulario = 'Novo Exame';
    this.formulario = new FormGroup({
      Id: new FormControl(null),
      Nome: new FormControl(null),
      Data: new FormControl(null),
      Resultado: new FormControl(null),
      PacienteId: new FormControl(null)
    });

    // Formulário de exclusão
    this.tituloFormulario = 'Deletando um Exame'
    this.formularioExclusao = new FormGroup({
    Id: new FormControl(null),
  });
}

  enviarFormulario(): void {
    const exame : Exame = this.formulario.value;
    this.examesService.cadastrar(exame).subscribe(result => {
      alert('Exame inserido com sucesso.');
    })
  }

  excluirExame(): void {
    const idExclusao: number = this.formularioExclusao.get('Id')?.value;

    if (idExclusao) {
      this.examesService.excluir(idExclusao).subscribe(result => {
        alert('Exame excluído com sucesso.');
      });
    } else {
      alert('Por favor, insira o ID do exame que deseja excluir.');
    }
  }

  selecionarFormulario(tipo: string) {
    this.formularioSelecionado = tipo;
  }
}
