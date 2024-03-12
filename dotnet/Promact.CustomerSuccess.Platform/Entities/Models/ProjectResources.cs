using System.ComponentModel.DataAnnotations.Schema;
using Volo.Abp.Domain.Entities.Auditing;

namespace Promact.CustomerSuccess.Platform.Entities
{
    public class ProjectResources : AuditedAggregateRootWithUser<Guid, ApplicationUser>
    {
        public required string Name { get; set; }
        public required double AllocationPercentage { get; set; }
        public required DateTime Start { get; set; }
        public required DateTime End { get; set; }
        public required string Role { get; set; }
        public required string Comments { get; set; }
        
        public required Guid ProjectId { get; set; }
        
        //[ForeignKey("Project")]
        //public virtual Project? Project { get; set; }
        //[ForeignKey("Resource")]
        //public virtual Guid Resource { get; set; }
        //public override object?[] GetKeys()
        //{
        //    throw new NotImplementedException();
        //}
    }
}