using SpaceGuard.DTOs;
using SpaceGuard.Interfaces;
using SpaceGuard.Models;

namespace SpaceGuard.Services;

public class SateliteService : ISateliteService
{
    private readonly ISateliteRepository _repository;

    public SateliteService(ISateliteRepository repository)
    {
        _repository = repository;
    }

    public IEnumerable<SateliteDto> ObterTodos()
    {
        return _repository.ObterTodos().Select(s => new SateliteDto
        {
            Id = s.Id,
            Nome = s.Nome,
            PaisOrigem = s.PaisOrigem,
            DataLancamento = s.DataLancamento
        });
    }

    public SateliteDto? ObterPorId(int id)
    {
        var satelite = _repository.ObterPorId(id);

        if (satelite == null)
            return null;

        return new SateliteDto
        {
            Id = satelite.Id,
            Nome = satelite.Nome,
            PaisOrigem = satelite.PaisOrigem,
            DataLancamento = satelite.DataLancamento
        };
    }

    public void Adicionar(SateliteDto dto)
    {
        var satelite = new Satelite
        {
            Id = dto.Id,
            Nome = dto.Nome,
            PaisOrigem = dto.PaisOrigem,
            DataLancamento = dto.DataLancamento
        };

        _repository.Adicionar(satelite);
    }

    public void Atualizar(SateliteDto dto)
    {
        var satelite = new Satelite
        {
            Id = dto.Id,
            Nome = dto.Nome,
            PaisOrigem = dto.PaisOrigem,
            DataLancamento = dto.DataLancamento
        };

        _repository.Atualizar(satelite);
    }

    public void Remover(int id)
    {
        _repository.Remover(id);
    }
}