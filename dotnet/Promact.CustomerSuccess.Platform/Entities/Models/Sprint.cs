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

        public required Guid ProjectId { get; set; }





        //[ForeignKey("PhaseMilestone")]
        //public Guid PhaseMilestoneId { get; set; }
        //public DateTime StartDate { get; set; }
        //public DateTime EndDate { get; set; }
        //public SprintStatus Status { get; set; }
        //public required string Comments { get; set; }
        //public required string Goals { get; set; }
        //public int SprintNumber { get; set; }
        //public virtual PhaseMilestone? PhaseMilestone { get; set; }
        //public override object?[] GetKeys()
        //{
        //    throw new NotImplementedException();
        //}
    }
}