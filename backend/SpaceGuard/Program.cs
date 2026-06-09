using Microsoft.EntityFrameworkCore;
using Npgsql;
using SpaceGuard.Data;
using SpaceGuard.Interfaces;
using SpaceGuard.Models;
using SpaceGuard.Repositories;
using SpaceGuard.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
var useInMemoryDatabase = false;

try
{
    using var connection = new NpgsqlConnection(connectionString);
    connection.Open();
}
catch
{
    useInMemoryDatabase = true;
}

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddDbContext<SpaceGuardContext>(options =>
{
    if (useInMemoryDatabase)
    {
        options.UseInMemoryDatabase("SpaceGuardFallback");
        return;
    }

    options.UseNpgsql(connectionString);
});

builder.Services.AddScoped<ISateliteRepository, SateliteRepository>();
builder.Services.AddScoped<IIndicadorRepository, IndicadorRepository>();
builder.Services.AddScoped<IAlertaRepository, AlertaRepository>();

builder.Services.AddScoped<ISateliteService, SateliteService>();
builder.Services.AddScoped<IIndicadorService, IndicadorService>();
builder.Services.AddScoped<IAlertaService, AlertaService>();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<SpaceGuardContext>();

    if (useInMemoryDatabase)
    {
        if (!context.Satelites.Any())
        {
            context.Satelites.Add(new Satelite
            {
                Id = 1,
                Nome = "CBERS-4A",
                PaisOrigem = "Brasil/China",
                DataLancamento = new DateTime(2020, 12, 20)
            });

            context.IndicadoresAmbientais.Add(new IndicadorAmbiental
            {
                Id = 1,
                Nome = "Temperatura Global",
                Valor = 29.5m,
                DataLeitura = DateTime.UtcNow,
                SateliteId = 1
            });

            context.AlertasAmbientais.Add(new AlertaAmbiental
            {
                Id = 1,
                Titulo = "Risco de Queimada",
                Descricao = "Possivel foco de calor detectado",
                NivelRisco = "ALTO",
                DataCriacao = DateTime.UtcNow,
                SateliteId = 1
            });

            context.SaveChanges();
        }
    }
    else
    {
        context.Database.Migrate();
    }
}

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseStaticFiles();

app.UseRouting();

app.UseCors("AllowFrontend");

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();