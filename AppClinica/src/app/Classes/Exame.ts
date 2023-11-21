import { Paciente } from "./Paciente";

export class Exame {
    id: number = 0;
    nome: string = '';
    data: Date | null = null;
    resultado: string = '';
    paciente: Paciente | undefined;
    pacienteId: number = 0;

  }