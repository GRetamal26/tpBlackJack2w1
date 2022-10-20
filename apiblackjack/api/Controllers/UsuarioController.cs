using api.Data;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BlackJackAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsuarioController : ControllerBase
{
    private readonly blackjackContext _context;
    public UsuarioController(blackjackContext context)
    {
        _context = context;
    }
    
    [HttpPost("login")]
   public async Task<ActionResult<UsuarioModel>> Create(UsuarioLoginModel userModel){
    
    var user = await _context.Usuarios.FirstOrDefaultAsync(x => x.NomUsuario == userModel.NomUsuario && x.Contrasenia == userModel.Contrasenia);
        if(user == null)
        {
            return Unauthorized("Usuario o Contraseña incorrecta");
        }
    UsuarioModel usuarioRetorno = new UsuarioModel();
    usuarioRetorno.NomUsuario = user.NomUsuario;
    usuarioRetorno.idUsuario = user.Idusuario;
    return Ok(usuarioRetorno);
   }

   [HttpPost("nuevoUsuario")]
   public async Task<ActionResult<UsuarioLoginModel>>nuevoUsuario(UsuarioLoginModel nuevoUsuario){
     var user = await _context.Usuarios.FirstOrDefaultAsync(x => x.NomUsuario == nuevoUsuario.NomUsuario);
        if(user != null)
        {
              return Unauthorized("Ya existe este nombre de usuario");
        } else {
            if(nuevoUsuario.NomUsuario != null && nuevoUsuario.Contrasenia != null){
                
              var nuevo = new Usuario();
              nuevo.NomUsuario = nuevoUsuario.NomUsuario;//esto no va a ser null
              nuevo.Contrasenia = nuevoUsuario.Contrasenia;//esto no va a ser null
              _context.Usuarios.Add(nuevo);
              await _context.SaveChangesAsync();
              
              return Ok(nuevo);
            } else {
             return Unauthorized("usuario o contraseña no tienen formato correcto");
            } 
        }

  
   }
   
}