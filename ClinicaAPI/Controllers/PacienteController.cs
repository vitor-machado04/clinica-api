using ClinicaAPI.Data;
using ClinicaAPI.Models;
using ClinicaAPI.Negocio;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ClinicaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PacienteController : ControllerBase
    {
        private ClinicaDbContext _context;

        public PacienteController(ClinicaDbContext context)
        {
            _context = context;
        }

        // Listando todos os pacientes
        [HttpGet()]
        [Route("listar")]
        public async Task<ActionResult<IEnumerable<Paciente>>> Listar()
        {
            if (_context.Paciente is null) return NotFound();
            return await _context.Paciente.ToListAsync();
        }

        // Cadastrando um paciente
        [HttpPost]
        [Route("/cadastrar")]
        public async Task<ActionResult<Paciente>> Cadastrar(Paciente paciente)
        {
            if (_context.Paciente is null) return NotFound();
            if (!CpfValidator.ValidateCpf(paciente.Cpf)) return BadRequest("CPF inválido.");
            await _context.AddAsync(paciente);
            await _context.SaveChangesAsync();
            return Created("", paciente);
        }

        // Buscando pelo ID
        [HttpGet]
        [Route("buscar/{id}")]
        public async Task<ActionResult<Paciente>> Buscar([FromRoute] int id)
        {
            if (_context.Paciente is null) return NotFound();
            var paciente = await _context.Paciente.FindAsync(id);
            if (paciente is null) return NotFound();
            return paciente;
        }

        // Alterando paciente
        [HttpPut]
        [Route("alterar")]
        public async Task<IActionResult> Alterar(Paciente paciente)
        {
            if (_context.Paciente is null) return NotFound();
            if (!CpfValidator.ValidateCpf(paciente.Cpf)) return BadRequest("CPF inválido.");
            _context.Paciente.Update(paciente);
            await _context.SaveChangesAsync();
            return Ok();
        }


        // Alterando CPF do paciente
        [HttpPatch()]
        [Route("mudarcpf/{id}")]
        public async Task<ActionResult> MudarCpf(int id, string cpf)
        {
            if (_context.Paciente is null) return NotFound();
            var objPaciente = await _context.Paciente.FindAsync(id);
            if (objPaciente is null) return NotFound();
            if (!CpfValidator.ValidateCpf(cpf)) return BadRequest("CPF inválido.");
            objPaciente.Cpf = cpf;
            await _context.SaveChangesAsync();
            return Ok();
        }

        // Excluindo um paciente
        [HttpDelete()]
        [Route("excluir/{id}")]
        public async Task<ActionResult> Excluir(int id)
        {
            if (_context.Paciente is null) return NotFound();
            var objPaciente = await _context.Paciente.FindAsync(id);
            if (objPaciente is null) return NotFound();
            _context.Paciente.Remove(objPaciente);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
