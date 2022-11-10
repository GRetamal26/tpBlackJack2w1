using System;
using System.Collections.Generic;

namespace api.Data
{
    public partial class Usuario
    {
        public Usuario()
        {
            Sesions = new HashSet<Sesion>();
        }

        public int Idusuario { get; set; }
        public string NomUsuario { get; set; } = null!;
        public string Contrasenia { get; set; } = null!;

        public virtual ICollection<Sesion> Sesions { get; set; }
    }
}
