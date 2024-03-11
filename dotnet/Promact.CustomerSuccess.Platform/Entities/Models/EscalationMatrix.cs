using System.ComponentModel.DataAnnotations.Schema;
using Volo.Abp.Domain.Entities.Auditing;

namespace Promact.CustomerSuccess.Platform.Entities
{
    public class EscalationMatrix : AuditedEntity<Guid>
    {
        public required EscalationMatrixLevels Level { get; set; }
        public required EscalationType EscalationType { get; set; }
        public required string Responsible { get; set; }
        
        public required Guid ProjectId { get; set; }


        //public EscalationMatrixLevels Level { get; set; }
        //public EscalationType EscalationType { get; set; }
        //[ForeignKey("Project")]
        //public required Guid ProjectId { get; set; }
        //public virtual Project? Project { get; set; }
        //public override object?[] GetKeys()
        //{
        //    throw new NotImplementedException();
        //}
    }
}