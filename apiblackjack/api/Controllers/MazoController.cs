using api.Data;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BlackJackAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MazoController : ControllerBase
{
  private readonly blackjackContext _context;

  public MazoController(blackjackContext context)
  {
    _context =  context;
  }

  //OBTENER MAZO NUEVO
  [HttpGet("MazoNuevo")]
    public async Task<ActionResult<List<CartaModel>>>GetMazoNuevo(){
        var mazo = await _context.Carta
        .Select(x => new CartaModel {Palo = x.Palo, Valor = x.Valor, EsAs=x.EsAs})
        .ToListAsync();

        return Ok(mazo);
    }

   
    
}

