using Volo.Abp.Domain.Entities.Auditing;

namespace Promact.CustomerSuccess.Platform.Entities
{
    public class Project : AuditedEntity<Guid>
    {
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
        public virtual ICollection<ApprovedTeam>? ApprovedTeams { get; set; }
        public virtual ICollection<AuditHistory>? AuditHistory { get; set; }
        public virtual ICollection<ClientFeedback>? ClientFeedbacks { get; set; }
        public virtual ICollection<EscalationMatrix>? EscalationMatrices { get; set; }
        public virtual ICollection<MeetingMinute>? MeetingMinutes { get; set; }
        public virtual ICollection<PhaseMilestone>? PhaseMilestones { get; set; }
        public virtual ICollection<ProjectBudget>? Budgets { get; set; }
        public virtual ICollection<ProjectResources>? Resources { get; set; }
        public virtual ICollection<ProjectScopeStack>? ProjectScopeStacks { get; set; }
        public virtual ICollection<ProjectUpdates>? ProjectUpdates { get; set; }
        public virtual ICollection<RiskProfile>? RiskProfiles { get; set; }
        public virtual ICollection<Sprint>? Sprints { get; set; }
        public virtual ICollection<Stakeholders>? Stakeholders { get; set; }
        public virtual ICollection<VersionHistory>? VersionHistory { get; set; }
    }
}
