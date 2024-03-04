using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class UpdateProjectScopeStackDto
    {
        public required string Scope { get; set; }
        public required string Stack { get; set; }
    }
}
