using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos.DbDto
{
    public class SprintDto : IEntityDto<Guid>
    {
        public Guid Id { get; set; }
        public required int SprintNumber { get; set; }
        public required DateTime StartDate { get; set; }
        public required DateTime EndDate { get; set; }
        public required SprintStatus Status { get; set; }
        public required string Comments { get; set; }
        public required Guid ProjectId { get; set; }
    }
}
