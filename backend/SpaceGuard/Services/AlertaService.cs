using SpaceGuard.DTOs;
using SpaceGuard.Interfaces;
using SpaceGuard.Models;

namespace SpaceGuard.Services;

public class AlertaService : IAlertaService
{
    private readonly IAlertaRepository _repository;

    public AlertaService(IAlertaRepository repository)
    {
        _repository = repository;
    }

    public IEnumerable<AlertaAmbientalDto> ObterTodos()
    {
        return _repository.ObterTodos().Select(a => new AlertaAmbientalDto
        {
            Id = a.Id,
            Titulo = a.Titulo,
            Descricao = a.Descricao,
            NivelRisco = a.NivelRisco,
            DataCriacao = a.DataCriacao,
            SateliteId = a.SateliteId
        });
    }

    public AlertaAmbientalDto? ObterPorId(int id)
    {
        var alerta = _repository.ObterPorId(id);

        if (alerta == null)
            return null;

        return new AlertaAmbientalDto
        {
            Id = alerta.Id,
            Titulo = alerta.Titulo,
            Descricao = alerta.Descricao,
            NivelRisco = alerta.NivelRisco,
            DataCriacao = alerta.DataCriacao,
            SateliteId = alerta.SateliteId
        };
    }

    public void Adicionar(AlertaAmbientalDto dto)
    {
        var alerta = new AlertaAmbiental
        {
            Id = dto.Id,
            Titulo = dto.Titulo,
            Descricao = dto.Descricao,
            NivelRisco = dto.NivelRisco,
            DataCriacao = dto.DataCriacao,
            SateliteId = dto.SateliteId
        };

        _repository.Adicionar(alerta);
    }

    public void Atualizar(AlertaAmbientalDto dto)
    {
        var alerta = new AlertaAmbiental
        {
            Id = dto.Id,
            Titulo = dto.Titulo,
            Descricao = dto.Descricao,
            NivelRisco = dto.NivelRisco,
            DataCriacao = dto.DataCriacao,
            SateliteId = dto.SateliteId
        };

        _repository.Atualizar(alerta);
    }

    public void Remover(int id)
    {
        _repository.Remover(id);
    }
}