using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ClinicaAPI.Models
{
public class Prontuario
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    [Required]
    public Paciente? Paciente { get; set; }
    public int? PacienteId { get; set; }
    [Required]
    public DateTime? DataCriacao { get; set; }
    [Required]
    public string? Diagnostico { get; set; }
    [Required]
    public string? Tratamento { get; set; }

}

}