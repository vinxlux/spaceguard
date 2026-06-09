using SpaceGuard.DTOs;

namespace SpaceGuard.Interfaces;

public interface ISateliteService
{
    IEnumerable<SateliteDto> ObterTodos();

    SateliteDto? ObterPorId(int id);

    void Adicionar(SateliteDto dto);

    void Atualizar(SateliteDto dto);

    void Remover(int id);
}