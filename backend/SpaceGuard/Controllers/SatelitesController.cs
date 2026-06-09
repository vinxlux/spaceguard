using Microsoft.AspNetCore.Mvc;
using SpaceGuard.DTOs;
using SpaceGuard.Interfaces;

namespace SpaceGuard.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SatelitesController : ControllerBase
{
    private readonly ISateliteService _service;

    public SatelitesController(ISateliteService service)
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
        var satelite = _service.ObterPorId(id);

        if (satelite == null)
            return NotFound();

        return Ok(satelite);
    }

    [HttpPost]
    public IActionResult Post(SateliteDto dto)
    {
        _service.Adicionar(dto);
        return StatusCode(201);
    }

    [HttpPut]
    public IActionResult Put(SateliteDto dto)
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