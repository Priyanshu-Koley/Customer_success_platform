using System.ComponentModel.DataAnnotations.Schema;
using Volo.Abp.Domain.Entities.Auditing;

namespace Promact.CustomerSuccess.Platform.Entities
{
    public class EscalationMatrix : AuditedEntity<Guid>
    {
        public required EscalationMatrixLevels Level { get; set; }
        public required EscalationType EscalationType { get; set; }
        public required string Responsible { get; set; }
        
        [ForeignKey(nameof(Project))]
        public required Guid ProjectId { get; set; }
        public Project? Project { get; set; }
    }
}