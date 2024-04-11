using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos.UpdateDto
{
    public class CreateStakeholdersDto
    {
        public required string UserID { get; set; }
        public string? Title { get; set; }
        public string? Name { get; set; }
        public string? Contact { get; set; }

        public required Guid ProjectId { get; set; }
    }
}
