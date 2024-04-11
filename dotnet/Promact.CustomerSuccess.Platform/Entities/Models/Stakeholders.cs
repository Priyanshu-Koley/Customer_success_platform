using System.ComponentModel.DataAnnotations.Schema;
using Volo.Abp.Domain.Entities.Auditing;

namespace Promact.CustomerSuccess.Platform.Entities
{
    public class Stakeholders : AuditedEntity<Guid>
    {
        public required string UserID { get; set; }
        public required string Title { get; set; }
        public required string Name { get; set; }
        public required string Contact { get; set; }

        [ForeignKey(nameof(Project))]
        public required Guid ProjectId { get; set; }
        public Project? Project { get; set; }
    }
}
