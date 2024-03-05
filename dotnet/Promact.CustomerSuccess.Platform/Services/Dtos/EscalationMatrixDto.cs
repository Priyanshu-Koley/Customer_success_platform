using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class EscalationMatrixDto : IEntityDto<Guid>
    {
        public Guid Id { get; set; }
        public required string Level { get; set; }
        public required string EscalationType { get; set; }
        public required string Responsible { get; set; }
        public string? ProjectId { get; set; }
    }
}