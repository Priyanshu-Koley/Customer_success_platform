using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos.DbDto
{
    public class ProjectResourcesDto : IEntityDto<Guid>
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required double AllocationPercentage { get; set; }
        public required DateTime Start { get; set; }
        public required DateTime End { get; set; }
        public required string Role { get; set; }
        public required string Comments { get; set; }

        public required Guid ProjectId { get; set; }
    }
}