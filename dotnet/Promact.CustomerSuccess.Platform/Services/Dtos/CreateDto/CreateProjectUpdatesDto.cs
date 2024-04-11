using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos.UpdateDto
{
    public class CreateProjectUpdatesDto
    {
        public DateTime Date { get; set; }
        public string? GeneralUpdates{ get; set; }

        public required Guid ProjectId { get; set; }
    }
}
