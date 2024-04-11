using System.ComponentModel.DataAnnotations.Schema;
using Volo.Abp.Domain.Entities.Auditing;

namespace Promact.CustomerSuccess.Platform.Entities
{
    public class PhaseMilestone : AuditedEntity<Guid>
    {
        public required string Title { get; set; }
        public required DateTime StartDate { get; set; }
        public required DateTime EndDate { get; set; }
        public required DateTime ApprovalDate { get; set; }
        public required DateTime RevisedCompletionDate { get; set; }
        public required string Comments { get; set; }
        public required MilestoneOrPhaseStatus Status { get; set; }

        [ForeignKey(nameof(Project))]
        public required Guid ProjectId { get; set; }
        public Project? Project { get; set; }

    }
}