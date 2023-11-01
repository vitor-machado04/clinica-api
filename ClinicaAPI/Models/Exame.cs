using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ClinicaAPI.Models
{
    public class Exame
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
     public int Id { get; set; }
    [Required]
    public string? Nome { get; set; }
    [Required]
    public DateTime? Data { get; set; }
    [Required]
    public string? Resultado { get; set; }
    [Required]
    public Paciente? Paciente { get; set; }
    public int PacienteId { get; set; }

    }

}