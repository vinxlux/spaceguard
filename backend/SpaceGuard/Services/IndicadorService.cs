using SpaceGuard.DTOs;
using SpaceGuard.Interfaces;
using SpaceGuard.Models;

namespace SpaceGuard.Services;

public class IndicadorService : IIndicadorService
{
    private readonly IIndicadorRepository _repository;

    public IndicadorService(IIndicadorRepository repository)
    {
        _repository = repository;
    }

    public IEnumerable<IndicadorAmbientalDto> ObterTodos()
    {
        return _repository.ObterTodos().Select(i => new IndicadorAmbientalDto
        {
            Id = i.Id,
            Nome = i.Nome,
            Valor = i.Valor,
            DataLeitura = i.DataLeitura,
            SateliteId = i.SateliteId
        });
    }

    public IndicadorAmbientalDto? ObterPorId(int id)
    {
        var indicador = _repository.ObterPorId(id);

        if (indicador == null)
            return null;

        return new IndicadorAmbientalDto
        {
            Id = indicador.Id,
            Nome = indicador.Nome,
            Valor = indicador.Valor,
            DataLeitura = indicador.DataLeitura,
            SateliteId = indicador.SateliteId
        };
    }

    public void Adicionar(IndicadorAmbientalDto dto)
    {
        var indicador = new IndicadorAmbiental
        {
            Id = dto.Id,
            Nome = dto.Nome,
            Valor = dto.Valor,
            DataLeitura = dto.DataLeitura,
            SateliteId = dto.SateliteId
        };

        _repository.Adicionar(indicador);
    }

    public void Atualizar(IndicadorAmbientalDto dto)
    {
        var indicador = new IndicadorAmbiental
        {
            Id = dto.Id,
            Nome = dto.Nome,
            Valor = dto.Valor,
            DataLeitura = dto.DataLeitura,
            SateliteId = dto.SateliteId
        };

        _repository.Atualizar(indicador);
    }

    public void Remover(int id)
    {
        _repository.Remover(id);
    }
}