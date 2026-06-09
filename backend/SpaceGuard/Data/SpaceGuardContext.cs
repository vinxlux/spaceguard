using Microsoft.EntityFrameworkCore;
using SpaceGuard.Models;

namespace SpaceGuard.Data;

public class SpaceGuardContext : DbContext
{
    public SpaceGuardContext(DbContextOptions<SpaceGuardContext> options)
        : base(options)
    {
    }

    public DbSet<Satelite> Satelites { get; set; }
    public DbSet<IndicadorAmbiental> IndicadoresAmbientais { get; set; }
    public DbSet<AlertaAmbiental> AlertasAmbientais { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Satelite>()
            .ToTable("satelites");

        modelBuilder.Entity<IndicadorAmbiental>()
            .ToTable("indicadores_ambientais");

        modelBuilder.Entity<AlertaAmbiental>()
            .ToTable("alertas_ambientais");

        modelBuilder.Entity<Satelite>()
            .HasMany(s => s.Indicadores)
            .WithOne(i => i.Satelite)
            .HasForeignKey(i => i.SateliteId);

        modelBuilder.Entity<Satelite>()
            .HasMany(s => s.Alertas)
            .WithOne(a => a.Satelite)
            .HasForeignKey(a => a.SateliteId);
    }
}