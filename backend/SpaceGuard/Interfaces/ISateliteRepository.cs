using SpaceGuard.Models;

namespace SpaceGuard.Interfaces;

public interface ISateliteRepository
{
    IEnumerable<Satelite> ObterTodos();

    Satelite? ObterPorId(int id);

    void Adicionar(Satelite satelite);

    void Atualizar(Satelite satelite);

    void Remover(int id);
}