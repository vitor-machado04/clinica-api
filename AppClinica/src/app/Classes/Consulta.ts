import { Medico } from "./Medico";
import { Paciente } from "./Paciente";

export class Consulta {
  id: number = 0;
  paciente: Paciente | undefined;
  pacienteId: number = 0;
  medico: Medico | undefined;
  medicoId: number = 0;
  razao: string = '';
  dataHora: Date | null = null;
}
