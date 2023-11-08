import { Medico } from "./Medico";
import { Paciente } from "./Paciente";

export class Consulta {
  Id: number | null = null;
  Paciente: Paciente | null = null;
  PacienteId: number | null = null;
  Medico: Medico | null = null;
  MedicoId: number | null = null;
  Razao: string | null = null;
  DataHora: Date | null = null;
}
