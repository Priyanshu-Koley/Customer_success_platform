using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos.UpdateDto
{
    public class UpdateAuditHistoryDto
    {
        public DateTime? AuditDate { get; set; }
        public string? ReviewedBy { get; set; }
        public string? Status { get; set; }
        public string? ReviewedSection { get; set; }
        public string? Comment { get; set; }
        public string? ActionItem { get; set; }

        public Guid? ProjectId { get; set; }
    }
}
