using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos.DbDto
{
    public class PhaseMilestoneDto : IEntityDto<Guid>
    {
        public Guid Id { get; set; }
        public required string Title { get; set; }
        public required DateTime StartDate { get; set; }
        public required DateTime EndDate { get; set; }
        public required DateTime ApprovalDate { get; set; }
        public required DateTime RevisedCompletionDate { get; set; }
        public required string Comments { get; set; }
        public required MilestoneOrPhaseStatus Status { get; set; }
        
        public required Guid ProjectId { get; set; }
    }
}