using System.ComponentModel.DataAnnotations.Schema;
using Volo.Abp.Domain.Entities.Auditing;

namespace Promact.CustomerSuccess.Platform.Entities
{
    public class ApprovedTeam : AuditedEntity<Guid>
    {
        public required int PhaseNumber { get; set; }
        public required int NumberOfResources { get; set; }
        public required string Role { get; set; }
        public required float Availability { get; set; }
        public required string Duration { get; set; }
        
        [ForeignKey(nameof(Project))]
        public required Guid ProjectId { get; set; }
        public Project? Project { get; set; }

    }
}