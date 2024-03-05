using Promact.CustomerSuccess.Platform.Services.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Promact.CustomerSuccess.Platform.Services
{
    public interface IProjectScopeStackService : IApplicationService
    {
        Task CreateProjectScopeStackAsync(ProjectScopeStackDto newProjectScopeStack);
        Task<ListResultDto<ProjectScopeStackDto>> GetProjectScopeStackByProjectId(string projectId);
        Task UpdateProjectScopeStackAsync(Guid id, UpdateProjectScopeStackDto updatedProjectScopeStack);
        Task DeleteProjectScopeStackAsync(Guid id);
    }
}
