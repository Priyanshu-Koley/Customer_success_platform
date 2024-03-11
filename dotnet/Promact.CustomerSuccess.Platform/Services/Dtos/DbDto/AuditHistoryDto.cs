using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos.DbDto
{
    public class AuditHistoryDto : IEntityDto<Guid>
    {
        public Guid Id { get; set; }
        public required string AuditDate { get; set; }
        public required string ReviewedBy { get; set; }
        public required string Status { get; set; }
        public required string ReviewedSection { get; set; }
        public required string Comment { get; set; }
        public required string ActionItem { get; set; }

        public required Guid ProjectId { get; set; }
    }
}
