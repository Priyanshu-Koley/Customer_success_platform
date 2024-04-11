using System.ComponentModel.DataAnnotations.Schema;
using Volo.Abp.Domain.Entities.Auditing;

namespace Promact.CustomerSuccess.Platform.Entities
{
    public class AuditHistory : AuditedEntity<Guid>
    {
        public required DateTime AuditDate { get; set; }
        public required string ReviewedBy { get; set; }
        public required string Status { get; set; }
        public required string ReviewedSection { get; set; }
        public required string Comment { get; set; }
        public required string ActionItem { get; set; }

        [ForeignKey(nameof(Project))]
        public required Guid ProjectId { get; set; }
        public Project? Project { get; set; }
    }
}
