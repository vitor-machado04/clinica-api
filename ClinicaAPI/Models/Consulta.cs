using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Numerics;

namespace ClinicaAPI.Models
{
    public class Consulta
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public Paciente? Paciente { get; set; }
        public int PacienteId { get; set; }
        [Required]
        public Medico? Medico { get; set; }
        public int MedicoId { get; set; }
        [Required]
        public string? Razao { get; set; }
        [Required]
        public DateTime? DataHora { get; set; }
    }

}
