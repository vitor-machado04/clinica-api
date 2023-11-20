using ClinicaAPI.Data;
using ClinicaAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Formats.Tar;

namespace ClinicaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExameController : ControllerBase
    {
        private ClinicaDbContext _context;

        public ExameController(ClinicaDbContext context)
        {
            _context = context;
        }

        [HttpGet()]
        [Route("listar")]
        public async Task<ActionResult<IEnumerable<Exame>>> Listar()
        {
            if (_context is null) return NotFound();

            var exames = await _context.Exame.Include(exame => exame.Paciente).Include(exame => exame.Paciente).ToListAsync();

            return Ok(exames);
        }

        // Cadastrando um exame
        [HttpPost()]
        [Route("cadastrar")]
        public async Task<ActionResult> Cadastrar(Exame exame)
        {
            if (_context is null) return NotFound();

            var existingPaciente = await _context.Paciente.FindAsync(exame.PacienteId);

            if (existingPaciente is null) return BadRequest("Paciente n�o encontrado.");
            exame.Paciente = existingPaciente;

            await _context.AddAsync(exame);
            await _context.SaveChangesAsync();
            return Created("", exame);
        }

        [HttpGet()]
        [Route("buscar/{id}")]
        public async Task<ActionResult<Exame>> Buscar([FromRoute] int id)
        {
            if (_context is null) return NotFound();
            var exame = await _context.Exame.FindAsync(id);
            if (exame is null) return NotFound();
            var tempPaciente = await _context.Paciente.FindAsync(exame.PacienteId);
            exame.Paciente = tempPaciente;
            return exame;
        }

        // Alterando exame
        [HttpPut()]
        [Route("atualizar")]
        public async Task<IActionResult> Atualizar(Exame exame)
        {
            if (_context is null) return NotFound();
            var tempPaciente = await _context.Paciente.FindAsync(exame.PacienteId);
            exame.Paciente = tempPaciente;
            _context.Exame.Update(exame);
            await _context.SaveChangesAsync();
            return Ok();
        }

        // Alterando nome do exame
        [HttpPatch()]
        [Route("mudarnome/{id}")]
        public async Task<ActionResult> MudarNome([FromRoute] int id, string nome)
        {
            if (_context is null) return NotFound();
            var objExame = await _context.Exame.FindAsync(id);
            if (objExame is null) return NotFound();
            objExame.Nome = nome;
            await _context.SaveChangesAsync();
            return Ok();
        }

        // Alterando resultado
        [HttpPatch()]
        [Route("mudarresultado/{id}")]
        public async Task<ActionResult> MudarResultado([FromRoute] int id, string resultado)
        {
            if (_context is null) return NotFound();
            var objExame = await _context.Exame.FindAsync(id);
            if (objExame is null) return NotFound();
            objExame.Resultado = resultado;
            await _context.SaveChangesAsync();
            return Ok();
        }

        // Alterando data do exame
        [HttpPatch()]
        [Route("mudardata/{id}")]
        public async Task<ActionResult> MudarData([FromRoute] int id, DateTime data)
        {
            if (_context is null) return NotFound();
            var objExame = await _context.Exame.FindAsync(id);
            if (objExame is null) return NotFound();
            objExame.Data = data;
            await _context.SaveChangesAsync();
            return Ok();
        }

        // Excluindo um exame
        [HttpDelete]
        [Route("excluir/{id}")]
        public async Task<ActionResult> Excluir([FromRoute] int id)
        {
            if (_context is null) return NotFound();
            var objExame = await _context.Exame.FindAsync(id);
            if (objExame is null) return NotFound();
            _context.Exame.Remove(objExame);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
