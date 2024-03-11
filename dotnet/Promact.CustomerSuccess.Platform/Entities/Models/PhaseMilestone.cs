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

        public required Guid ProjectId { get; set; }

        //public Guid Id { get; set; }
        //[ForeignKey("Project")]
        //public Guid ProjectId { get; set; }
        //public required string Title { get; set; }
        //public DateTime StartDate { get; set; }
        //public DateTime EndDate { get; set; }
        //public required string Description { get; set; }
        //public required string Comments { get; set; }
        //public MilestoneOrPhaseStatus Status { get; set; }
        //public virtual Project? Project { get; set; }
        //public virtual ICollection<Sprint>? Sprints { get; set; }

        //public override object?[] GetKeys()
        //{
        //    throw new NotImplementedException();
        //}
    }
}