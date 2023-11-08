import { Medico } from "./Medico";
import { Paciente } from "./Paciente";

export class Consulta {
  Id: number = 0;
  Paciente: Paciente | undefined;
  PacienteId: number = 0;
  Medico: Medico | undefined;
  MedicoId: number = 0;
  Razao: string = '';
  DataHora: Date | null = null;
}
