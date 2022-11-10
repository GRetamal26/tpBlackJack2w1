using System;
using System.Collections.Generic;

namespace api.Data
{
    public partial class Sesion
    {
        public int Idsesion { get; set; }
        public int? Idusuario { get; set; }
        public ulong? Enjuego { get; set; }
        public int? VictoriasJugador { get; set; }
        public int? BlackjackJugador { get; set; }
        public int? BlackjackCrupier { get; set; }
        public int? TotalDePartidas { get; set; }
        public int? SePasoDe21 { get; set; }

        public virtual Usuario? IdusuarioNavigation { get; set; }
    }
}
