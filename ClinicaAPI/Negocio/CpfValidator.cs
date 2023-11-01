using System;
namespace ClinicaAPI.Negocio;

using System;

public class CpfValidator
{
    public static bool ValidateCpf(string cpf)
    {
        // Remove caracteres não numéricos
        cpf = cpf.Replace(".", "").Replace("-", "");

        // Verifica se o CPF tem 11 dígitos
        if (cpf.Length != 11)
            return false;

        // Verifica se todos os dígitos são iguais (ex: 111.111.111-11)
        if (IsAllDigitsEqual(cpf))
            return false;

        // Calcula os dígitos verificadores
        int[] cpfArray = new int[11];
        for (int i = 0; i < 11; i++)
        {
            cpfArray[i] = int.Parse(cpf[i].ToString());
        }

        int firstDigit = CalculateDigit(cpfArray, 9);
        int secondDigit = CalculateDigit(cpfArray, 10);

        return cpfArray[9] == firstDigit && cpfArray[10] == secondDigit;
    }

    private static int CalculateDigit(int[] cpf, int position)
    {
        int sum = 0;
        for (int i = 0; i < position; i++)
        {
            sum += cpf[i] * (position + 1 - i);
        }

        int remainder = sum % 11;

        if (remainder < 2)
            return 0;
        else
            return 11 - remainder;
    }

    private static bool IsAllDigitsEqual(string cpf)
    {
        char firstDigit = cpf[0];
        foreach (char digit in cpf)
        {
            if (digit != firstDigit)
                return false;
        }
        return true;
    }
}