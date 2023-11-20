using ClinicaAPI.Data;
using ClinicaAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ClinicaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReceitaController : ControllerBase
    {
        private ClinicaDbContext _context;

        public ReceitaController(ClinicaDbContext context)
        {
            _context = context;
        }

        // Listando todas as receitas
        [HttpGet()]
        [Route("listar")]
        public async Task<ActionResult<IEnumerable<Receita>>> Listar()
        {
            if (_context is null) return NotFound();

            var receitas = await _context.Receita.Include(receita => receita.Medico).ToListAsync();

            return Ok(receitas);
        }

        // Cadastrando uma receita
        [HttpPost()]
        [Route("cadastrar")]
        public async Task<ActionResult> Cadastrar(Receita receita)
        {
            if (_context is null) return NotFound();

            var existingMedico = await _context.Medico.FindAsync(receita.IdMedico);

            if (existingMedico is null) return BadRequest("Médico não encontrado.");
            receita.Medico = existingMedico;

            await _context.AddAsync(receita);
            await _context.SaveChangesAsync();
            return Created("", receita);
        }

        [HttpGet()]
        [Route("buscar/{id}")]
        public async Task<ActionResult<Receita>> Buscar([FromRoute] int id)
        {
            if (_context is null) return NotFound();

            var receita = await _context.Receita.FindAsync(id);
            if (receita is null) return NotFound();

            var tempMedico = await _context.Medico.FindAsync(receita.IdMedico);
            receita.Medico = tempMedico;
            return Ok(receita);
        }

        // Alterando receita
        [HttpPut()]
        [Route("atualizar")]
        public async Task<IActionResult> Alterar(Receita receita)
        {
            if (_context is null) return NotFound();
            var tempMedico = await _context.Medico.FindAsync(receita.IdMedico);
            if(tempMedico is null) return BadRequest("Médico não encontrado.");

            receita.Medico = tempMedico;
            _context.Receita.Update(receita);
            await _context.SaveChangesAsync();
            return Ok();
        }


        // Alterando dosagem
        [HttpPatch()]
        [Route("mudardosagem/{id}")]
        public async Task<ActionResult> MudarDosagem([FromRoute] int id, string dosagem)
        {
            if (_context is null) return NotFound();
            var objDosagem = await _context.Receita.FindAsync(id);
            if (objDosagem is null) return NotFound();
            objDosagem.Dosagem = dosagem;
            await _context.SaveChangesAsync();
            return Ok("Data da receita alterada com sucesso.");
        }

        // Alterando data da receita
        [HttpPatch()]
        [Route("mudardata/{id}")]
        public async Task<ActionResult> MudarData([FromRoute] int id, DateTime dataEmissao)
        {
            if (_context is null) return NotFound();
            var objReceita = await _context.Receita.FindAsync(id);
            if (objReceita is null) return NotFound();
            objReceita.DataEmissao = dataEmissao;
            await _context.SaveChangesAsync();
            return Ok();
        }

        // Excluindo uma receita
        [HttpDelete]
        [Route("excluir/{id}")]
        public async Task<ActionResult> Excluir([FromRoute] int id)
        {
            if (_context is null) return NotFound();
            var objReceita = await _context.Receita.FindAsync(id);
            if (objReceita is null) return BadRequest("Receita não encontrada.");
            _context.Receita.Remove(objReceita);
            await _context.SaveChangesAsync();
            return Ok("Receita excluída com sucesso.");
        }
    }
}
