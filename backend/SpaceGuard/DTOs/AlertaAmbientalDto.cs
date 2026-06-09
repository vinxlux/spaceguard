namespace SpaceGuard.DTOs;

public class AlertaAmbientalDto
{
    public int Id { get; set; }

    public string Titulo { get; set; } = string.Empty;

    public string Descricao { get; set; } = string.Empty;

    public string NivelRisco { get; set; } = string.Empty;

    public DateTime DataCriacao { get; set; }

    public int SateliteId { get; set; }
}