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
            sesionModel.BlackjackJugador =  DBSesion.BlackjackJugador;
            sesionModel.BlackjackCrupier = DBSesion.BlackjackCrupier;
            sesionModel.VictoriasJugador = DBSesion.VictoriasJugador;
            sesionModel.SePasoDe21 = DBSesion.SePasoDe21;
            sesionModel.TotalDePartidas = DBSesion.TotalDePartidas;
            return Ok(sesionModel);
          } else {
            //SI NO EXISTE CREO UNA SESION NUEVA Y HAGO EL INSERT A LA BD RELACIONADO CON EL ID DEL USUARIO (IDSESION ES IDENTITY)
            var DBNewSesion = new Sesion();
            DBNewSesion.Idusuario = idUsuario;
            DBNewSesion.Enjuego = 0;
            DBNewSesion.BlackjackJugador = 0;
            DBNewSesion.BlackjackCrupier = 0;
            DBNewSesion.VictoriasJugador = 0;
            DBNewSesion.SePasoDe21 = 0;
            DBNewSesion.TotalDePartidas = 0;
            await _context.Sesions.AddAsync(DBNewSesion);
            await _context.SaveChangesAsync();
            //PARA LA RESPUESTA NECESITO TRAER EL ID DE LA SESION CREADA
            var usuarioCreado = await _context.Sesions.FirstOrDefaultAsync(x => x.Idusuario == idUsuario); //no va a devolver null porque 3 lineas arriba creo esta sesion
            var sesionModel = new SesionCreateModel();
            sesionModel.Idusuario = usuarioCreado.Idusuario;//nunca va a ser null
            sesionModel.Idsesion = usuarioCreado.Idsesion;
            sesionModel.Enjuego = usuarioCreado.Enjuego;
            sesionModel.BlackjackJugador =  usuarioCreado.BlackjackJugador;
            sesionModel.BlackjackCrupier = usuarioCreado.BlackjackCrupier;
            sesionModel.VictoriasJugador = usuarioCreado.VictoriasJugador;
            sesionModel.SePasoDe21 = usuarioCreado.SePasoDe21;
            sesionModel.TotalDePartidas = usuarioCreado.TotalDePartidas;
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
        sesion.BlackjackJugador = DBSesion.BlackjackJugador;
        sesion.BlackjackCrupier = DBSesion.BlackjackCrupier;
        sesion.VictoriasJugador = DBSesion.VictoriasJugador;
        sesion.SePasoDe21 = DBSesion.SePasoDe21;
        sesion.TotalDePartidas = DBSesion.TotalDePartidas;
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
        juegoIniciado.BlackjackCrupier = sesionModificada.BlackjackCrupier;
        juegoIniciado.BlackjackJugador = sesionModificada.BlackjackJugador;
        juegoIniciado.TotalDePartidas = sesionModificada.TotalDePartidas;
        juegoIniciado.VictoriasJugador = sesionModificada.VictoriasJugador;        
        juegoIniciado.SePasoDe21 = sesionModificada.SePasoDe21;
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
        respuesta.BlackjackCrupier = query.BlackjackCrupier;
        respuesta.BlackjackJugador = query.BlackjackJugador;
        respuesta.TotalDePartidas = query.TotalDePartidas;
        respuesta.VictoriasJugador = query.VictoriasJugador;
        respuesta.SePasoDe21 = query.SePasoDe21;
        
        return Ok(respuesta);
      } else {
        return NotFound();
      }
      
    }


    [HttpPut("ActualizarEstadisticas")]
    public async Task<ActionResult<SesionCreateModel>>Estadisticas(SesionCreateModel sesion){
      var DBSesion = await _context.Sesions.FirstOrDefaultAsync(x => x.Idsesion == sesion.Idsesion);

      if(DBSesion == null){
        return NotFound("No se encontro la sesion.");
      } else {
        DBSesion.BlackjackJugador = sesion.BlackjackJugador;
        DBSesion.BlackjackCrupier = sesion.BlackjackCrupier;
        DBSesion.VictoriasJugador = sesion.VictoriasJugador;
        DBSesion.TotalDePartidas = sesion.TotalDePartidas;
        DBSesion.SePasoDe21 = sesion.SePasoDe21;
        await _context.SaveChangesAsync();

        return Ok(sesion);
      }
    }


    [HttpGet("EstadisticasGlobales")]
    public async Task<ActionResult<Vistareportesglobal>>ReporteGlobal(){
      var query = await _context.Vistareportesglobals.FirstOrDefaultAsync();    
      return Ok(query);
    }

    [HttpGet("EstadisticasJugador")]
    public async Task<ActionResult<Vistareportesjugador>>ReporteJugador(int Usuario){
      var query = await _context.Vistareportesjugadors.FirstOrDefaultAsync(x => x.Usuario == Usuario);
       if(query != null){
        var usuario = new Vistareportesjugador();
        usuario.Usuario = query.Usuario;
        usuario.Victorias = query.Victorias;
        usuario.Partidas = query.Partidas;
        usuario.Bjugador = query.Bjugador;
        usuario.Bcrupier = query.Bcrupier;
        usuario.MasDe21 = query.MasDe21;
        return Ok(usuario);
      } else {
        return NotFound("Usuario no encontrado");
      }      
    }

     [HttpGet("MasSePasaron")]
    public async Task<ActionResult<Vistausuariosconmas21>>ReporteMas21(){
      var query = await _context.Vistausuariosconmas21s
      .Select(x => new Vistausuariosconmas21 {Usuario = x.Usuario, MasDe21 = x.MasDe21})
      .ToListAsync<Vistausuariosconmas21>();
      return Ok(query);
    }

}

