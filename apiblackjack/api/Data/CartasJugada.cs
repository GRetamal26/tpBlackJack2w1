﻿using System;
using System.Collections.Generic;

namespace api.Data
{
    public partial class CartasJugada
    {
        public int? Idcj { get; set; }
        public int? Idsesion { get; set; }
        public string? Palo { get; set; }
        public int? Valor { get; set; }
        public ulong? EsAs { get; set; }
    }
}