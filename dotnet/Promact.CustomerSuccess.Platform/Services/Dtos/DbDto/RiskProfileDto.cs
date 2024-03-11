using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos.DbDto
{
    public class RiskProfileDto : IEntityDto<Guid>
    {
        public Guid Id { get; set; }
        public required RiskType RiskType { get; set; }
        public required string Description { get; set; }
        public required RiskSeverity Severity { get; set; }
        public required RiskImpact Impact { get; set; }
        public required string RemedialSteps { get; set; }
        public required string Status { get; set; }
        public required DateTime ClosureDate { get; set; }
       
        public Guid? ProjectId { get; set; }

    }
}