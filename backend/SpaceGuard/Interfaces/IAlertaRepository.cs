using SpaceGuard.Models;

namespace SpaceGuard.Interfaces;

public interface IAlertaRepository
{
    IEnumerable<AlertaAmbiental> ObterTodos();

    AlertaAmbiental? ObterPorId(int id);

    void Adicionar(AlertaAmbiental alerta);

    void Atualizar(AlertaAmbiental alerta);

    void Remover(int id);
}