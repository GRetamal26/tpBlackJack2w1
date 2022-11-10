using api.Data;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ManoCrupierController : ControllerBase
{
    private readonly blackjackContext _context;

  public ManoCrupierController(blackjackContext context)
  {
    _context =  context;
  }

   [HttpGet("ManoCrupier")]
    public async Task<ActionResult<List<CartaModel>>>GetManoCrupier(int idSesion){
        var query = await _context.ManoCrupiers
        .Where(x => x.Idsesion == idSesion)
        .Select(x => new ManoCrupier {Palo = x.Palo, Valor = x.Valor, EsAs=x.EsAs})
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

  [HttpPost("InsertManoCrupier")]
  public async Task<ActionResult<CartaModel>> CreateManoCrupier(CartaInsertModel c){

    var newCarta = new ManoCrupier();
    newCarta.Idsesion = c.Idsesion;
    newCarta.Palo = c.Palo;
    newCarta.Valor = c.Valor;
    newCarta.EsAs = c.EsAs;

    await _context.ManoCrupiers.AddAsync(newCarta);
   
    await _context.SaveChangesAsync();
    //carta que voy a dar de respuesta al front
    var cartaRetorno = new CartaModel();
    cartaRetorno.Palo = newCarta.Palo;
    cartaRetorno.Valor = newCarta.Valor;
    cartaRetorno.EsAs = newCarta.EsAs;

    return Ok(cartaRetorno);
  }

  [HttpDelete("DeleteManoCrupier")]
  public async Task<ActionResult> DeleteManoCrupier(int idSesion){
    var query =  _context.ManoCrupiers.Where(x => x.Idsesion == idSesion);

   foreach (var registro in query)
    {
      _context.ManoCrupiers.Remove(registro);
    }
    await _context.SaveChangesAsync();

    return Ok();
  }

}
