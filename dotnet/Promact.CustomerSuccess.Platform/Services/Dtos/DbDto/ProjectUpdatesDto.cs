using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos.DbDto
{
    public class ProjectUpdatesDto : IEntityDto<Guid>
    {
        public Guid Id { get; set; }
        public required DateTime Date { get; set; }
        public required string GeneralUpdates{ get; set; }
        
        public required Guid ProjectId { get; set; }
    }
}
