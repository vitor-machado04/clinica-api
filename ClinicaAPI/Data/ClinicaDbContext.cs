using ClinicaAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ClinicaAPI.Data {
    public class ClinicaDbContext : DbContext {
        
        public DbSet<Medico>? Medico {  get; set; }
        public DbSet<Paciente>? Paciente { get; set; }
        public DbSet<Consulta>? Consulta { get; set; }
        public DbSet<Receita>? Receita {get; set;}
        public DbSet<Exame>? Exame {get; set;}
        public DbSet<Prontuario>? Prontuario {get; set;}

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {

            optionsBuilder.UseSqlite("DataSource=Clinica.db;Cache=Shared");

        }
    }
}
