using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace api.Data
{
    public partial class blackjackContext : DbContext
    {
        public blackjackContext()
        {
        }

        public blackjackContext(DbContextOptions<blackjackContext> options)
            : base(options)
        {
        }

        public virtual DbSet<CartasJugada> CartasJugadas { get; set; } = null!;
        public virtual DbSet<CartasSinJugar> CartasSinJugars { get; set; } = null!;
        public virtual DbSet<Cartum> Carta { get; set; } = null!;
        public virtual DbSet<ManoCrupier> ManoCrupiers { get; set; } = null!;
        public virtual DbSet<ManoJugador> ManoJugadors { get; set; } = null!;
        public virtual DbSet<Sesion> Sesions { get; set; } = null!;
        public virtual DbSet<Usuario> Usuarios { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseMySql("server=localhost;database=blackjack;uid=root;pwd=franciscov2", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.31-mysql"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseCollation("utf8mb4_0900_ai_ci")
                .HasCharSet("utf8mb4");

            modelBuilder.Entity<CartasJugada>(entity =>
            {
                entity.HasKey(e => e.Idcj)
                    .HasName("PRIMARY");

                entity.ToTable("cartas_jugadas");

                entity.Property(e => e.Idcj).HasColumnName("idcj");

                entity.Property(e => e.EsAs)
                    .HasColumnType("bit(1)")
                    .HasColumnName("esAs");

                entity.Property(e => e.Idsesion).HasColumnName("idsesion");

                entity.Property(e => e.Palo)
                    .HasMaxLength(1)
                    .HasColumnName("palo");

                entity.Property(e => e.Valor).HasColumnName("valor");
            });

            modelBuilder.Entity<CartasSinJugar>(entity =>
            {
                entity.HasKey(e => e.Idsj)
                    .HasName("PRIMARY");

                entity.ToTable("cartas_sin_jugar");

                entity.Property(e => e.Idsj).HasColumnName("idsj");

                entity.Property(e => e.EsAs)
                    .HasColumnType("bit(1)")
                    .HasColumnName("esAs");

                entity.Property(e => e.Idsesion).HasColumnName("idsesion");

                entity.Property(e => e.Palo)
                    .HasMaxLength(1)
                    .HasColumnName("palo");

                entity.Property(e => e.Valor).HasColumnName("valor");
            });

            modelBuilder.Entity<Cartum>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("carta");

                entity.Property(e => e.EsAs)
                    .HasColumnType("bit(1)")
                    .HasColumnName("esAs");

                entity.Property(e => e.Palo)
                    .HasMaxLength(1)
                    .HasColumnName("palo");

                entity.Property(e => e.Valor).HasColumnName("valor");
            });

            modelBuilder.Entity<ManoCrupier>(entity =>
            {
                entity.HasKey(e => e.Idmc)
                    .HasName("PRIMARY");

                entity.ToTable("mano_crupier");

                entity.Property(e => e.Idmc).HasColumnName("idmc");

                entity.Property(e => e.EsAs)
                    .HasColumnType("bit(1)")
                    .HasColumnName("esAs");

                entity.Property(e => e.Idsesion).HasColumnName("idsesion");

                entity.Property(e => e.Palo)
                    .HasMaxLength(1)
                    .HasColumnName("palo");

                entity.Property(e => e.Valor).HasColumnName("valor");
            });

            modelBuilder.Entity<ManoJugador>(entity =>
            {
                entity.HasKey(e => e.Idmj)
                    .HasName("PRIMARY");

                entity.ToTable("mano_jugador");

                entity.Property(e => e.Idmj).HasColumnName("idmj");

                entity.Property(e => e.EsAs)
                    .HasColumnType("bit(1)")
                    .HasColumnName("esAs");

                entity.Property(e => e.Idsesion).HasColumnName("idsesion");

                entity.Property(e => e.Palo)
                    .HasMaxLength(1)
                    .HasColumnName("palo");

                entity.Property(e => e.Valor).HasColumnName("valor");
            });

            modelBuilder.Entity<Sesion>(entity =>
            {
                entity.HasKey(e => e.Idsesion)
                    .HasName("PRIMARY");

                entity.ToTable("sesion");

                entity.HasIndex(e => e.Idusuario, "fk_usuario_idx");

                entity.Property(e => e.Idsesion).HasColumnName("idsesion");

                entity.Property(e => e.Enjuego)
                    .HasColumnType("bit(1)")
                    .HasColumnName("enjuego")
                    .HasDefaultValueSql("b'0'");

                entity.Property(e => e.Idusuario).HasColumnName("idusuario");

                entity.HasOne(d => d.IdusuarioNavigation)
                    .WithMany(p => p.Sesions)
                    .HasForeignKey(d => d.Idusuario)
                    .HasConstraintName("fk_usuario");
            });

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasKey(e => e.Idusuario)
                    .HasName("PRIMARY");

                entity.ToTable("usuario");

                entity.Property(e => e.Idusuario).HasColumnName("idusuario");

                entity.Property(e => e.Contrasenia)
                    .HasMaxLength(45)
                    .HasColumnName("contrasenia");

                entity.Property(e => e.NomUsuario)
                    .HasMaxLength(45)
                    .HasColumnName("nom_usuario");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
