using System.ComponentModel.DataAnnotations.Schema;
using Volo.Abp.Domain.Entities.Auditing;

namespace Promact.CustomerSuccess.Platform.Entities
{
    public class ProjectUpdates : AuditedEntity<Guid>
    {
        public required DateTime Date { get; set; }
        public required string GeneralUpdates{ get; set; }
        
        public required Guid ProjectId { get; set; }

    }
}