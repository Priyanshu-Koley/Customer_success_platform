using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos.DbDto
{
    public class ProjectDto : IEntityDto<Guid>
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        //public string? Description { get; set; }
        public required string ProjectManagerName { get; set; }
        public required string ClientName { get; set; }
        public required string ClientEmail { get; set; }
        public string? Brief { get; set; }
        public string? Purpose { get; set; }
        public string? Goal { get; set; }
        public string? Objective { get; set; }
        public string? TotalBudget { get; set; }
        public int? MembersAssociated { get; set; }
        public string? Status { get; set; }
        public DateTime CreationTime { get; set; }


        //public IEnumerable<DocumentDto>? Documents { get; set; }
        //public IEnumerable<ProjectBudgetDto>? Budgets { get; set; }
        //public IEnumerable<EscalationMatrixDto>? EscalationMatrices { get; set; }
        //public IEnumerable<RiskProfileDto>? RiskProfiles { get; set; }
        //public IEnumerable<PhaseMilestoneDto>? PhaseMilestones { get; set; }
        //public IEnumerable<ProjectResourcesDto>? Resources { get; set; }
        //public IEnumerable<ClientFeedbackDto>? ClientFeedbacks { get; set; }
        //public IEnumerable<MeetingMinuteDto>? MeetingMinutes { get; set; }

    }
}
