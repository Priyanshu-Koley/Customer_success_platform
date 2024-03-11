using System.ComponentModel.DataAnnotations.Schema;
using Volo.Abp.Domain.Entities.Auditing;

namespace Promact.CustomerSuccess.Platform.Entities
{
    public class RiskProfile : AuditedEntity<Guid>
    {

        public required RiskType RiskType { get; set; }
        public required string Description { get; set; }
        public required RiskSeverity Severity { get; set; }
        public required RiskImpact Impact { get; set; }
        public required string RemedialSteps { get; set; }
        public required string Status { get; set; }
        public required DateTime ClosureDate { get; set; }

        public required Guid ProjectId { get; set; }



    //[ForeignKey("Project")]
    //public Guid ProjectId { get; set; }
    //public RiskType RiskType { get; set; }
    //public RiskSeverity Severity { get; set; }
    //public RiskImpact Impact { get; set; }        
    //public virtual ICollection<RemediationStep>? RemediationSteps { get; set; }
    //public virtual Project? Project { get; set; }
    //public override object?[] GetKeys()
    //{
    //    throw new NotImplementedException();
    //}
    }
}