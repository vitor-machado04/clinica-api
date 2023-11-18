import { Paciente } from "./Paciente";

export class Prontuario {
    id: number = 0;
    paciente: Paciente | undefined;
    pacienteId: number = 0;
    dataCriacao: Date | null = null;
    diagnostico: string = '';
    tratamento: string = '';
}