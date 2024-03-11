using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos.DbDto
{
    public class ClientFeedbackDto: IEntityDto<Guid>
    {
        public Guid Id { get; set; }
        public required DateTime FeedbackDate { get; set; }
        public required FeedbackType FeedbackType { get; set; }
        public required string Details { get; set; }
        public required string ActionTaken { get; set; }
        public required DateTime ClosureDate { get; set; }

        public required Guid ProjectId { get; set; }
    }
}