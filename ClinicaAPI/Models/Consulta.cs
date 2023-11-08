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
        public Paciente? Paciente { get; set; }
        [Required]
        public int PacienteId { get; set; }
        public Medico? Medico { get; set; }
        [Required]
        public int MedicoId { get; set; }
        [Required]
        public string? Razao { get; set; }
        public DateTime? DataHora { get; set; }
    }

}
