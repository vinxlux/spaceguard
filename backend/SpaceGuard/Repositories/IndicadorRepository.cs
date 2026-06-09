using SpaceGuard.Data;
using SpaceGuard.Interfaces;
using SpaceGuard.Models;

namespace SpaceGuard.Repositories;

public class IndicadorRepository : IIndicadorRepository
{
    private readonly SpaceGuardContext _context;

    public IndicadorRepository(SpaceGuardContext context)
    {
        _context = context;
    }

    public IEnumerable<IndicadorAmbiental> ObterTodos()
    {
        return _context.IndicadoresAmbientais.ToList();
    }

    public IndicadorAmbiental? ObterPorId(int id)
    {
        return _context.IndicadoresAmbientais.FirstOrDefault(i => i.Id == id);
    }

    public void Adicionar(IndicadorAmbiental indicador)
    {
        _context.IndicadoresAmbientais.Add(indicador);
        _context.SaveChanges();
    }

    public void Atualizar(IndicadorAmbiental indicador)
    {
        _context.IndicadoresAmbientais.Update(indicador);
        _context.SaveChanges();
    }

    public void Remover(int id)
    {
        var indicador = ObterPorId(id);

        if (indicador != null)
        {
            _context.IndicadoresAmbientais.Remove(indicador);
            _context.SaveChanges();
        }
    }
}