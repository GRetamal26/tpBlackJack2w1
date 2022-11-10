using api.Data;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ManoJugadorController : ControllerBase
{
  private readonly blackjackContext _context;

  public ManoJugadorController(blackjackContext context)
  {
    _context =  context;
  }

   [HttpGet("ManoJugador")]
    public async Task<ActionResult<List<CartaModel>>>GetManoJugador(int idSesion){
        var query = await _context.ManoJugadors
        .Where(x => x.Idsesion == idSesion)
        .Select(x => new ManoJugador {Palo = x.Palo, Valor = x.Valor, EsAs=x.EsAs})
        .ToListAsync();

        var mano = new List<CartaModel>();
        foreach (var x in query)
        {
          var carta = new CartaModel();
          carta.Palo = x.Palo;
          carta.Valor = x.Valor;
          carta.EsAs = x.EsAs;
          mano.Add(carta);
        }

        return Ok(mano);
    }

  [HttpPost("InsertManoJugador")]
  public async Task<ActionResult<CartaModel>> CreateManoJugador(CartaInsertModel c){

  
    var newCarta = new ManoJugador();
    newCarta.Idsesion = c.Idsesion;
    newCarta.Palo = c.Palo;
    newCarta.Valor = c.Valor;
    newCarta.EsAs = c.EsAs;
    await _context.ManoJugadors.AddAsync(newCarta);
    
    await _context.SaveChangesAsync();
    //carta que voy a dar de respuesta al front
    var cartaRetorno = new CartaModel();
    cartaRetorno.Palo = newCarta.Palo;
    cartaRetorno.Valor = newCarta.Valor;
    cartaRetorno.EsAs = newCarta.EsAs;

    return Ok(cartaRetorno);
  }

  [HttpDelete("DeleteManoJugador")]
  public async Task<ActionResult> DeleteManoJugador(int idSesion){
    var query =  _context.ManoJugadors.Where(x => x.Idsesion == idSesion);

   foreach (var registro in query)
    {
      _context.ManoJugadors.Remove(registro);
    }
    await _context.SaveChangesAsync();

    return Ok();
  }

}
