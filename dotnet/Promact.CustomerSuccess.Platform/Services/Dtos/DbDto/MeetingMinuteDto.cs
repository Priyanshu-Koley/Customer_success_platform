using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos.DbDto
{
    public class MeetingMinuteDto: IEntityDto<Guid>
    {
        public Guid Id { get; set; }
        public required DateTime MeetingDate { get; set; }
        public required int DurationInMinutes { get; set; }
        public required string MoMLink { get; set; }
        public required string Comments { get; set; }
        
        public required Guid? ProjectId { get; set; }
    }
}