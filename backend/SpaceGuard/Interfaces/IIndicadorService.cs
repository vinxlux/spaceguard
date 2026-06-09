using SpaceGuard.DTOs;

namespace SpaceGuard.Interfaces;

public interface IIndicadorService
{
    IEnumerable<IndicadorAmbientalDto> ObterTodos();

    IndicadorAmbientalDto? ObterPorId(int id);

    void Adicionar(IndicadorAmbientalDto dto);

    void Atualizar(IndicadorAmbientalDto dto);

    void Remover(int id);
}