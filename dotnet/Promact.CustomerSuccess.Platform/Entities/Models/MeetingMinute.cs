using System.ComponentModel.DataAnnotations.Schema;
using Volo.Abp.Domain.Entities.Auditing;

namespace Promact.CustomerSuccess.Platform.Entities
{
    public class MeetingMinute : AuditedAggregateRootWithUser<Guid, ApplicationUser>
    {
        public required DateTime MeetingDate { get; set; }
        public required int DurationInMinutes { get; set; }
        public required string MoMLink { get; set; }
        public required string Comments { get; set; }
        
        public required Guid ProjectId { get; set; }
        
        //[ForeignKey("Project")]
        //public virtual Project? Project { get; set; }

        //public override object?[] GetKeys()
        //{
        //    throw new NotImplementedException();
        //}
    }
}