using SpaceGuard.Data;
using SpaceGuard.Interfaces;
using SpaceGuard.Models;

namespace SpaceGuard.Repositories;

public class AlertaRepository : IAlertaRepository
{
    private readonly SpaceGuardContext _context;

    public AlertaRepository(SpaceGuardContext context)
    {
        _context = context;
    }

    public IEnumerable<AlertaAmbiental> ObterTodos()
    {
        return _context.AlertasAmbientais.ToList();
    }

    public AlertaAmbiental? ObterPorId(int id)
    {
        return _context.AlertasAmbientais.FirstOrDefault(a => a.Id == id);
    }

    public void Adicionar(AlertaAmbiental alerta)
    {
        _context.AlertasAmbientais.Add(alerta);
        _context.SaveChanges();
    }

    public void Atualizar(AlertaAmbiental alerta)
    {
        _context.AlertasAmbientais.Update(alerta);
        _context.SaveChanges();
    }

    public void Remover(int id)
    {
        var alerta = ObterPorId(id);

        if (alerta != null)
        {
            _context.AlertasAmbientais.Remove(alerta);
            _context.SaveChanges();
        }
    }
}