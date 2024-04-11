using System.ComponentModel.DataAnnotations.Schema;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Entities.Auditing;

namespace Promact.CustomerSuccess.Platform.Entities
{
    public class ClientFeedback : AuditedEntity<Guid>
    {
        public required DateTime FeedbackDate { get; set; }
        public required FeedbackType FeedbackType { get; set; }
        public required string Details { get; set; }
        public required string ActionTaken { get; set; }
        public required DateTime ClosureDate { get; set; }

        [ForeignKey(nameof(Project))]
        public required Guid ProjectId { get; set; }
        public Project? Project { get; set; }
    }
}