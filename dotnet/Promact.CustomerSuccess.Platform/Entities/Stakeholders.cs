using Volo.Abp.Domain.Entities.Auditing;

namespace Promact.CustomerSuccess.Platform.Entities
{
    public class Stakeholders : AuditedEntity<Guid>
    {
        public required string Title { get; set; }
        public required string Name { get; set; }
        public required string Contact { get; set; }
        public required string ProjectId { get; set; }
    }
}
