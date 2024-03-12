using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos.UpdateDto
{
    public class UpdateVersionHistoryDto
    {
        public int? Version { get; set; }
        public string? Type { get; set; }
        public string? Change { get; set; }
        public string? ChangeReason { get; set; }
        public string? CreatedBy { get; set; }
        public string? RevisionDate { get; set; }
        public string? ApprovalDate { get; set; }
        public string? ApprovedBy { get; set; }

        public Guid? ProjectId { get; set; }
    }
}
