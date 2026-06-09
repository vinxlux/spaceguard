using Microsoft.AspNetCore.Mvc;
using SpaceGuard.DTOs;
using SpaceGuard.Interfaces;

namespace SpaceGuard.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AlertasController : ControllerBase
{
    private readonly IAlertaService _service;

    public AlertasController(IAlertaService service)
    {
        _service = service;
    }

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_service.ObterTodos());
    }

    [HttpGet("{id}")]
    public IActionResult Get(int id)
    {
        var alerta = _service.ObterPorId(id);

        if (alerta == null)
            return NotFound();

        return Ok(alerta);
    }

    [HttpPost]
    public IActionResult Post(AlertaAmbientalDto dto)
    {
        _service.Adicionar(dto);
        return StatusCode(201);
    }

    [HttpPut]
    public IActionResult Put(AlertaAmbientalDto dto)
    {
        _service.Atualizar(dto);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        _service.Remover(id);
        return NoContent();
    }
}