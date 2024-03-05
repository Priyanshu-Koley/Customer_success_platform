using System.ComponentModel.DataAnnotations.Schema;
using Volo.Abp.Domain.Entities.Auditing;

namespace Promact.CustomerSuccess.Platform.Entities
{
    public class RiskProfile : AuditedEntity<Guid>
    {

        public required string RiskType { get; set; }
        public required string Description { get; set; }
        public required string Severity { get; set; }
        public required string Impact { get; set; }
        public required string RemediationSteps { get; set; }
        public required string Status { get; set; }
        public required string ClosureDate { get; set; }
        public required string ProjectId { get; set; }



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