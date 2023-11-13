import { Paciente } from "./Paciente";

export class Prontuario {
    Id: number = 0;
    Paciente: Paciente | undefined;
    PacienteId: number = 0;
    DataCriacao: Date | null = null;
    Diagnostico: string = '';
    Tratamento: string = '';
}