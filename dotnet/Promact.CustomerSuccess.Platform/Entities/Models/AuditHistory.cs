using Volo.Abp.Domain.Entities.Auditing;

namespace Promact.CustomerSuccess.Platform.Entities
{
    public class AuditHistory : AuditedEntity<Guid>
    {
        public required string AuditDate { get; set; }
        public required string ReviewedBy { get; set; }
        public required string Status { get; set; }
        public required string ReviewedSection { get; set; }
        public required string Comment { get; set; }
        public required string ActionItem { get; set; }

        public required Guid ProjectId { get; set; }
    }
}
