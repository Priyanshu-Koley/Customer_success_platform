using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos.DbDto
{
    public class EscalationMatrixDto : IEntityDto<Guid>
    {
        public Guid Id { get; set; }
        public required EscalationMatrixLevels Level { get; set; }
        public required EscalationType EscalationType { get; set; }
        public required string Responsible { get; set; }
        
        public required Guid ProjectId { get; set; }
    }
}