using System;
using System.Collections.Generic;

namespace api.Data
{
    public partial class Sesion
    {
        public int Idsesion { get; set; }
        public int? Idusuario { get; set; }
        public ulong? Enjuego { get; set; }

        public virtual Usuario? IdusuarioNavigation { get; set; }
    }
}
