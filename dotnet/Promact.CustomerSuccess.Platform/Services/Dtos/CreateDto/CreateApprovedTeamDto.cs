using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos.UpdateDto
{
    public class CreateApprovedTeamDto
    {
        public required int PhaseNumber { get; set; }
        public int NumberOfResources { get; set; }
        public string? Role { get; set; }
        public float Availability { get; set; }
        public string? Duration { get; set; }

        public Guid? ProjectId { get; set; }
    }
}
