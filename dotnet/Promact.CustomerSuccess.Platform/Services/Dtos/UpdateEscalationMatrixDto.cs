using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class UpdateEscalationMatrixDto
    {
        public required int Level { get; set; }
        public required string EscalationType { get; set; }
        public required string Responsible { get; set; }
        public string? ProjectId { get; set; }
    }
}