using Volo.Abp.Domain.Entities.Auditing;

namespace Promact.CustomerSuccess.Platform.Entities
{
    public class ProjectScopeStack : AuditedEntity<Guid>
    {
        public required string Scope { get; set; }
        public required string Stack { get; set; }
        
        public required Guid ProjectId { get; set; }
    }
}
