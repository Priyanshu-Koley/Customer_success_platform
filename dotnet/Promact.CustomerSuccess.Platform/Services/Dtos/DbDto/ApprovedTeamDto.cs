using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos.DbDto
{
    public class ApprovedTeamDto : IEntityDto<Guid>
    {
        public Guid Id { get; set; }
        public required int PhaseNumber { get; set; }
        public required int NumberOfResources { get; set; }
        public required string Role { get; set; }
        public required float Availability { get; set; }
        public required string Duration { get; set; }
        
        public required Guid ProjectId { get; set; }
    }
}
