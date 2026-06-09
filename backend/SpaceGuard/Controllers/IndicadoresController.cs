using Microsoft.AspNetCore.Mvc;
using SpaceGuard.DTOs;
using SpaceGuard.Interfaces;

namespace SpaceGuard.Controllers;

[ApiController]
[Route("api/[controller]")]
public class IndicadoresController : ControllerBase
{
    private readonly IIndicadorService _service;

    public IndicadoresController(IIndicadorService service)
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
        var indicador = _service.ObterPorId(id);

        if (indicador == null)
            return NotFound();

        return Ok(indicador);
    }

    [HttpPost]
    public IActionResult Post(IndicadorAmbientalDto dto)
    {
        _service.Adicionar(dto);
        return StatusCode(201);
    }

    [HttpPut]
    public IActionResult Put(IndicadorAmbientalDto dto)
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