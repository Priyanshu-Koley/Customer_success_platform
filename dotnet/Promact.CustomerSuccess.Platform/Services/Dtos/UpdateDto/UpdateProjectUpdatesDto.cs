using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos.UpdateDto
{
    public class UpdateProjectUpdatesDto
    {
        public DateTime? Date { get; set; }
        public string? GeneralUpdates{ get; set; }

        public Guid? ProjectId { get; set; }
    }
}
