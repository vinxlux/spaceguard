using SpaceGuard.Models;

namespace SpaceGuard.Interfaces;

public interface IIndicadorRepository
{
    IEnumerable<IndicadorAmbiental> ObterTodos();

    IndicadorAmbiental? ObterPorId(int id);

    void Adicionar(IndicadorAmbiental indicador);

    void Atualizar(IndicadorAmbiental indicador);

    void Remover(int id);
}