using System.ComponentModel.DataAnnotations.Schema;
using Volo.Abp.Data;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.Users;

namespace Promact.CustomerSuccess.Platform.Entities
{
    public class VersionHistory : AuditedEntity<Guid>
    {
        public required int Version { get; set; }
        public required string Type { get; set; }
        public required string Change { get; set; }
        public required string ChangeReason { get; set;}
        public required string CreatedBy { get; set; }
        public required string RevisionDate { get; set; }
        public required string ApprovalDate { get; set; }
        public required string ApprovedBy { get; set; }

        [ForeignKey(nameof(Project))]
        public required Guid ProjectId { get; set; }
        public Project? Project { get; set; }

    }
}
