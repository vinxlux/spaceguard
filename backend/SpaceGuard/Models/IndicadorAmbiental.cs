namespace SpaceGuard.Models;

public class IndicadorAmbiental
{
    public int Id { get; set; }

    public string Nome { get; set; } = string.Empty;

    public decimal Valor { get; set; }

    public DateTime DataLeitura { get; set; }

    public int SateliteId { get; set; }

    public Satelite? Satelite { get; set; }
}