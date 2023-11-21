import { Medico } from "./Medico";

export class Receita {
    id: number = 0;
    medicamento: string = '';
    dosagem: string = '';
    instrucoesUso: string = '';
    dataEmissao: Date | null = null;
    medico: Medico | undefined;
    idMedico: number = 0;
}
