using Promact.CustomerSuccess.Platform.Entities;
using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos.DbDto
{
    public class ProjectDto : IEntityDto<Guid>
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required string ProjectManagerId { get; set; }
        public required string ProjectManagerName { get; set; }
        public required string ClientId { get; set; }
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



        public IEnumerable<ApprovedTeam>? ApprovedTeams { get; set; }
        public IEnumerable<AuditHistory>? AuditHistory { get; set; }
        public IEnumerable<ClientFeedback>? ClientFeedbacks { get; set; }
        public IEnumerable<EscalationMatrix>? EscalationMatrices { get; set; }
        public IEnumerable<MeetingMinute>? MeetingMinutes { get; set; }
        public IEnumerable<PhaseMilestone>? PhaseMilestones { get; set; }
        public IEnumerable<ProjectBudget>? Budgets { get; set; }
        public IEnumerable<ProjectResources>? Resources { get; set; }
        public IEnumerable<ProjectScopeStack>? ProjectScopeStacks { get; set; }
        public IEnumerable<ProjectUpdates>? ProjectUpdates { get; set; }
        public IEnumerable<RiskProfile>? RiskProfiles { get; set; }
        public IEnumerable<Sprint>? Sprints { get; set; }
        public IEnumerable<Stakeholders>? Stakeholders { get; set; }
        public IEnumerable<VersionHistory>? VersionHistory { get; set; }

    }
}
