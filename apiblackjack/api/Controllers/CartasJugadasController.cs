using api.Data;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CartasJugadasController : ControllerBase
{
    private readonly blackjackContext _context;

  public CartasJugadasController(blackjackContext context)
  {
    _context =  context;
  }

   [HttpGet("CartasJugadas")]
    public async Task<ActionResult<List<CartaModel>>>GetCartasJugadas(int idSesion){
        var query = await _context.CartasJugadas
        .Where(x => x.Idsesion == idSesion)
        .Select(x => new CartasJugada {Palo = x.Palo, Valor = x.Valor, EsAs=x.EsAs})
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

        return Created("se inserto",mano);
    }

  [HttpPost("InsertCartasJugadas")]
  public async Task<ActionResult<CartaModel>> CreateCartasJugadas(CartaInsertModel c){

    //carta que voy a insertar en la tabla cartas_jugadas
    var newCarta = new CartasJugada();
    newCarta.Idsesion = c.Idsesion;
    newCarta.Palo = c.Palo;
    newCarta.Valor = c.Valor;
    newCarta.EsAs = c.EsAs;
    await _context.CartasJugadas.AddAsync(newCarta);
    //se ejecuta el insert
    await _context.SaveChangesAsync();
    //carta que voy a dar de respuesta al front
    var cartaRetorno = new CartaModel();
    cartaRetorno.Palo = newCarta.Palo;
    cartaRetorno.Valor = newCarta.Valor;
    cartaRetorno.EsAs = newCarta.EsAs;

    return Ok(cartaRetorno);
  }


  [HttpDelete("DeleteCartasJugadas")]
  public async Task<ActionResult<bool>> DeleteCartasJugadas(int idSesion){
    var query =  _context.CartasJugadas.Where(x => x.Idsesion == idSesion);

   foreach (var registro in query)
    {
      _context.CartasJugadas.Remove(registro);
    }
    await _context.SaveChangesAsync();

    return Ok(); 
  }
}
