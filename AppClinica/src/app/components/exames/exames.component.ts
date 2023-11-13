import { FormControl, FormGroup } from '@angular/forms';
import { ExamesService } from 'src/app/Services/exames.service';
import { Exame } from 'src/app/Classes/Exame';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exames',
  templateUrl: './exames.component.html',
  styleUrls: ['./exames.component.css']
})
export class ExamesComponent implements OnInit {
  formulario: FormGroup;
  tituloFormulario: string = 'Novo Exame';

  constructor(private examesService: ExamesService) {
    this.formulario = new FormGroup({
      Id: new FormControl(null),
      Nome: new FormControl(null),
      Data: new FormControl(null),
      Resultado: new FormControl(null),
      PacienteId: new FormControl(null)
    });
  }

  async enviarFormulario() {
    const exame: Exame = this.formulario.value;
    try {
      await this.examesService.cadastrar(exame).toPromise();
      alert('Exame inserido com sucesso.');
    } catch (error) {
      console.log(error);
    }
  }

  ngOnInit(): void {
    // O restante do seu código de inicialização, se houver
  }
}
