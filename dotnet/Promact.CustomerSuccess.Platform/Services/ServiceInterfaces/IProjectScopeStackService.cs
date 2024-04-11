using Promact.CustomerSuccess.Platform.Services.Dtos.DbDto;
using Promact.CustomerSuccess.Platform.Services.Dtos.UpdateDto;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Promact.CustomerSuccess.Platform.Services.ServiceInterface
{
    public interface IProjectScopeStackService : IApplicationService
    {
        Task<ListResultDto<ProjectScopeStackDto>> GetProjectScopeStackByProjectId(string projectId);
    }
}
