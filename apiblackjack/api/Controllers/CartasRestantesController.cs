using api.Data;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CartasRestantesController : ControllerBase
{
    private readonly blackjackContext _context;

  public CartasRestantesController(blackjackContext context)
  {
    _context =  context;
  }

   [HttpGet("CartasRestantes")]
    public async Task<ActionResult<List<CartaModel>>>GetCartasRestantes(int idSesion){
        var query = await _context.CartasSinJugars
        .Where(x => x.Idsesion == idSesion)
        .Select(x => new CartasSinJugar {Palo = x.Palo, Valor = x.Valor, EsAs=x.EsAs})
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

  [HttpPost("InsertCartasRestantes")]
  public async Task<ActionResult<CartaModel>> CreateCartasRestantes(CartaInsertModel c){


    var newCarta = new CartasSinJugar();
    newCarta.Idsesion = c.Idsesion;
    newCarta.Palo = c.Palo;
    newCarta.Valor = c.Valor;
    newCarta.EsAs = c.EsAs;
    await _context.CartasSinJugars.AddAsync(newCarta);
    
    await _context.SaveChangesAsync();
    //carta que voy a dar de respuesta al front
    var cartaRetorno = new CartaModel();
    cartaRetorno.Palo = newCarta.Palo;
    cartaRetorno.Valor = newCarta.Valor;
    cartaRetorno.EsAs = newCarta.EsAs;

    return Ok(cartaRetorno);

  }

  [HttpDelete("DeleteCartasRestantes")]
  public async Task<ActionResult> DeleteCartasSinJugar(int idSesion){
    var query =  _context.CartasSinJugars.Where(x => x.Idsesion == idSesion);

   foreach (var registro in query)
    {
      _context.CartasSinJugars.Remove(registro);
    }
    await _context.SaveChangesAsync();

    return Ok();
  }

}
