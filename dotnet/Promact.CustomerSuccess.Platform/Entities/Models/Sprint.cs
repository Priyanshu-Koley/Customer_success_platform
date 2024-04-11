using System.ComponentModel.DataAnnotations.Schema;
using Volo.Abp.Domain.Entities.Auditing;

namespace Promact.CustomerSuccess.Platform.Entities
{
    public class Sprint : AuditedEntity<Guid>
    {
        public required int SprintNumber { get; set; }
        public required DateTime StartDate { get; set; }
        public required DateTime EndDate { get; set; }
        public required SprintStatus Status { get; set; }
        public required string Comments { get; set; }
        public required string Goals { get; set; }

        [ForeignKey(nameof(Project))]
        public required Guid ProjectId { get; set; }
        public Project? Project { get; set; }
        [ForeignKey(nameof(PhaseMilestone))]
        public Guid PhaseMilestoneId { get; set; }
        public virtual PhaseMilestone? PhaseMilestone { get; set; }
    }
}