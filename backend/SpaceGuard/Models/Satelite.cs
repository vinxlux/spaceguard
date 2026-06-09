namespace SpaceGuard.Models;

public class Satelite
{
    public int Id { get; set; }

    public string Nome { get; set; } = string.Empty;

    public string PaisOrigem { get; set; } = string.Empty;

    public DateTime DataLancamento { get; set; }

    public List<IndicadorAmbiental> Indicadores { get; set; } = new();

    public List<AlertaAmbiental> Alertas { get; set; } = new();
}