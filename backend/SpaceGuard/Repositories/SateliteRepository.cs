using Microsoft.EntityFrameworkCore;
using SpaceGuard.Data;
using SpaceGuard.Interfaces;
using SpaceGuard.Models;

namespace SpaceGuard.Repositories;

public class SateliteRepository : ISateliteRepository
{
    private readonly SpaceGuardContext _context;

    public SateliteRepository(SpaceGuardContext context)
    {
        _context = context;
    }

    public IEnumerable<Satelite> ObterTodos()
    {
        return _context.Satelites
            .Include(s => s.Indicadores)
            .Include(s => s.Alertas)
            .ToList();
    }

    public Satelite? ObterPorId(int id)
    {
        return _context.Satelites
            .Include(s => s.Indicadores)
            .Include(s => s.Alertas)
            .FirstOrDefault(s => s.Id == id);
    }

    public void Adicionar(Satelite satelite)
    {
        _context.Satelites.Add(satelite);
        _context.SaveChanges();
    }

    public void Atualizar(Satelite satelite)
    {
        _context.Satelites.Update(satelite);
        _context.SaveChanges();
    }

    public void Remover(int id)
    {
        var satelite = ObterPorId(id);

        if (satelite != null)
        {
            _context.Satelites.Remove(satelite);
            _context.SaveChanges();
        }
    }
}