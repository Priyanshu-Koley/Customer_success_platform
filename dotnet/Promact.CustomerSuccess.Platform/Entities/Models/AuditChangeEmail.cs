using System.ComponentModel.DataAnnotations.Schema;
using Volo.Abp.Domain.Entities.Auditing;

namespace Promact.CustomerSuccess.Platform.Entities
{
    // Define model for audit history change email
    public class AuditChangeModel
    {
        public required string Name { get; set; } // Name of the recipient
        public required string[] ToEmails { get; set; } // Email address of the recipient
        public required AuditHistory ChangedAudit { get; set; } // Changed Audit
    }
}