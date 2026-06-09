using SpaceGuard.DTOs;

namespace SpaceGuard.Interfaces;

public interface IAlertaService
{
    IEnumerable<AlertaAmbientalDto> ObterTodos();

    AlertaAmbientalDto? ObterPorId(int id);

    void Adicionar(AlertaAmbientalDto dto);

    void Atualizar(AlertaAmbientalDto dto);

    void Remover(int id);
}