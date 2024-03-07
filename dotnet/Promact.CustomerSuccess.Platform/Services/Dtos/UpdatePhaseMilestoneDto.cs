using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class UpdatePhaseMilestoneDto 
    {
        public required string Title { get; set; }
        public required DateTime StartDate { get; set; }
        public required DateTime EndDate { get; set; }
        public required DateTime ApprovalDate { get; set; }
        public required DateTime RevisedCompletionDate { get; set; }
        public required string Comments { get; set; }
        public required string Status { get; set; }
        public string? ProjectId { get; set; }
    }
}