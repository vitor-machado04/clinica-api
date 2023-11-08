using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ClinicaAPI.Models
{
    public class Receita
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string? Medicamento { get; set; }
        [Required]
        public string? Dosagem { get; set; }
        [Required]
        public string? InstrucoesUso { get; set; }
        [Required]
        public DateTime? DataEmissao { get; set; }
        public Medico? Medico { get; set; }
        [Required]
        public int IdMedico { get; set; }
    }

}