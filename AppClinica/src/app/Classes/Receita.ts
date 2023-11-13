import { Medico } from "./Medico";

export class Receita {
    Id: number = 0;
    Medicamento: string = '';
    Dosagem: string = '';
    InstrucoesUso: string = '';
    DataEmissao: Date | null = null;
    Medico: Medico | undefined;
    MedicoId: number = 0;
}