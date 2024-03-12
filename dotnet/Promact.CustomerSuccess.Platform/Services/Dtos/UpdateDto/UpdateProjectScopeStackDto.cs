using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos.UpdateDto
{
    public class UpdateProjectScopeStackDto
    {
        public string? Scope { get; set; }
        public string? Stack { get; set; }

        public Guid? ProjectId { get; set; }
    }
}
