import { Paciente } from "./Paciente";

export class Exame {
    Id: number = 0;
    Nome: string = '';
    Data: Date | null = null;
    Resultado: string = '';
    Paciente: Paciente | undefined;
    PacienteId: number = 0;
  }