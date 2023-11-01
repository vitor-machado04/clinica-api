using ClinicaAPI.Data;
using ClinicaAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ClinicaAPI.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class MedicoController : ControllerBase {

        private ClinicaDbContext _context;

        public MedicoController(ClinicaDbContext context)
        {
            _context = context;
        }

        // Listando todos os médicos
        [HttpGet()]
        [Route("listar")]
        public async Task<ActionResult<IEnumerable<Medico>>> Listar()
        {
            if(_context.Medico is null) return NotFound();
            return await _context.Medico.ToListAsync();
        }

        // Cadastrando um médico
        [HttpPost()]
        [Route("cadastrar")]
        public async Task<ActionResult> Cadastrar(Medico medico)
        {
            await _context.AddAsync(medico);
            await _context.SaveChangesAsync();
            return Created("", medico);
        }

        // Buscando pelo ID
        [HttpGet()]
        [Route("buscar/{id}")]
        public async Task<ActionResult<Medico>> Buscar([FromRoute] int id)
        {
            if (_context.Medico is null) return NotFound();
            var medico = await _context.Medico.FindAsync(id);
            if (medico is null) return NotFound();
            return medico;
        }

        // Alterando médico
        [HttpPut()]
        [Route("alterar")]
        public async Task<IActionResult> Alterar(Medico medico)
        {
            if (_context.Medico is null) return NotFound();
            _context.Medico.Update(medico);
            await _context.SaveChangesAsync();
            return Ok();
        }

        // Alterando CRM do médico
        [HttpPatch()]
        [Route("mudarcrm/{id}")]
        public async Task<ActionResult> MudarCrm(int id, string crm)
        {
            if (_context.Medico is null) return NotFound();
            var objMedico = await _context.Medico.FindAsync(id);
            if (objMedico is null) return NotFound();  
            objMedico.Crm = crm;
            await _context.SaveChangesAsync();
            return Ok();
        }

        // Excluindo um médico
        [HttpDelete()]
        [Route("excluir/{id}")]
        public async Task<ActionResult> Excluir(int id)
        {
            if (_context.Medico is null) return NotFound();
            var objMedico = await _context.Medico.FindAsync(id);
            if(objMedico is null) return NotFound();
            _context.Medico.Remove(objMedico);
            await _context.SaveChangesAsync();
            return Ok();
        }

    }
}
