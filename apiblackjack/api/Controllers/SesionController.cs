using api.Data;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BlackJackAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SesionController : ControllerBase
{
  private readonly blackjackContext _context;

  public SesionController(blackjackContext context)
  {
    _context =  context;
  }


  [HttpPost("VerificarSesion")]
    public async Task<ActionResult<SesionCreateModel>> VerificarSesion(int idUsuario){
        var user = await _context.Usuarios.FirstOrDefaultAsync(x => x.Idusuario == idUsuario);
        var DBSesion = await _context.Sesions.FirstOrDefaultAsync(x => x.Idusuario == idUsuario);

        //SI EL USUARIO NO EXISTE NO PUEDO ACCEDER A LA TABLA SESIONES
        if(user == null){
          return Unauthorized("El usuario no existe");
        //SI EL USUARIO EXISTE, VERIFICO QUE TENGA UNA SESION
        } else {
          if(DBSesion != null){
            //SI LA SESION YA EXISTE DEVUELVO LA SESION
            var sesionModel = new SesionCreateModel();
            sesionModel.Idusuario = DBSesion.Idusuario;
            sesionModel.Idsesion = DBSesion.Idsesion;
            sesionModel.Enjuego = DBSesion.Enjuego;
            return Ok(sesionModel);
          } else {
            //SI NO EXISTE CREO UNA SESION NUEVA Y HAGO EL INSERT A LA BD RELACIONADO CON EL ID DEL USUARIO (IDSESION ES IDENTITY)
            var DBNewSesion = new Sesion();
            DBNewSesion.Idusuario = idUsuario;
            DBNewSesion.Enjuego = 0;
            await _context.Sesions.AddAsync(DBNewSesion);
            await _context.SaveChangesAsync();
            //PARA LA RESPUESTA NECESITO TRAER EL ID DE LA SESION CREADA
            var usuarioCreado = await _context.Sesions.FirstOrDefaultAsync(x => x.Idusuario == idUsuario); //no va a devolver null porque 3 lineas arriba creo esta sesion
            var sesionModel = new SesionCreateModel();
            sesionModel.Idusuario = usuarioCreado.Idusuario;//nunca va a ser null
            sesionModel.Idsesion = usuarioCreado.Idsesion;
            sesionModel.Enjuego = usuarioCreado.Enjuego;
            return Ok(sesionModel);
          }
        }
    }

    [HttpGet("EstadoDeJuego")]
    public async Task<ActionResult<int>>Juego(int idSesion){
      var DBSesion = await _context.Sesions.FirstOrDefaultAsync(x => x.Idsesion == idSesion);
      if(DBSesion != null){
        return Ok(DBSesion.Enjuego);
      } else {
        return NotFound("Juego no encontrado");
      }
    }

    [HttpGet("Sesion")]
    public async Task<ActionResult<SesionCreateModel>>getSesion(int idSesion){
      var DBSesion = await _context.Sesions.FirstOrDefaultAsync(x => x.Idsesion == idSesion);
      if(DBSesion != null){
        var sesion = new SesionCreateModel();
        sesion.Idsesion = DBSesion.Idsesion;
        sesion.Idusuario = DBSesion.Idusuario;
        sesion.Enjuego = DBSesion.Enjuego;
        return Ok(sesion);
      } else {
        return NotFound("Sesion no encontrado");
      }
    }

    [HttpPut("IniciarJuegoNuevo")]
    public async Task<ActionResult<SesionCreateModel>>Iniciar(SesionCreateModel sesion){
      var DBSesion = await _context.Sesions.FirstOrDefaultAsync(x => x.Idsesion == sesion.Idsesion);
      //ESTO NO VA A SER NULL NUNCA
      if(DBSesion != null && DBSesion.Enjuego == 0){
        DBSesion.Enjuego = 1;
        await _context.SaveChangesAsync();
        //tengo que traer el registro modificado
        var sesionModificada = await _context.Sesions.FirstOrDefaultAsync(x => x.Idsesion == sesion.Idsesion);
        var juegoIniciado = new SesionCreateModel();
        juegoIniciado.Idusuario = sesionModificada.Idusuario;//nunca va a ser null
        juegoIniciado.Idsesion = sesionModificada.Idsesion;
        juegoIniciado.Enjuego = sesionModificada.Enjuego;
        return Ok(juegoIniciado);
      } else {
        return Unauthorized("Ya hay una partida en juego.");
      }
    }

    [HttpPut("ReiniciarJuego")]
    public async Task<ActionResult<SesionCreateModel>> reiniciar(SesionCreateModel sesion){
      var query = await _context.Sesions.FirstOrDefaultAsync(x => x.Idsesion == sesion.Idsesion);
      if(query != null){
        query.Enjuego = 0;
        await _context.SaveChangesAsync();
        var respuesta = new SesionCreateModel();
        respuesta.Idusuario=query.Idusuario;
        respuesta.Idsesion = query.Idsesion;
        respuesta.Enjuego = query.Enjuego;
        
        return Ok(respuesta);
      } else {
        return NotFound();
      }
      
    }
}

