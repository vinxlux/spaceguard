using Microsoft.EntityFrameworkCore;
using SpaceGuard.Data;
using SpaceGuard.Interfaces;
using SpaceGuard.Repositories;
using SpaceGuard.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();

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
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

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
    context.Database.Migrate();
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