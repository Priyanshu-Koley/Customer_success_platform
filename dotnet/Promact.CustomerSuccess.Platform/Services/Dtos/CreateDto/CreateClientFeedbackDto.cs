using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos.UpdateDto
{
    public class CreateClientFeedbackDto
    {
        public DateTime FeedbackDate { get; set; }
        public FeedbackType FeedbackType { get; set; }
        public string? Details { get; set; }
        public string? ActionTaken { get; set; }
        public DateTime ClosureDate { get; set; }

        public required Guid ProjectId { get; set; }
    }
}
