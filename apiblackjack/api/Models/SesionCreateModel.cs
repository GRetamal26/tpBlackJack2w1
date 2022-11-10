namespace api.Models;

public class SesionCreateModel
{
    public int? Idsesion { get; set; }
    public int? Idusuario { get; set; }
    public ulong? Enjuego { get; set; }
    public int? VictoriasJugador { get; set; }     
    public int? BlackjackJugador { get; set; }
    public int? BlackjackCrupier { get; set; }
    public int? TotalDePartidas { get; set; }
    public int? SePasoDe21 { get; set; }
}
