using Promact.CustomerSuccess.Platform.Services.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Promact.CustomerSuccess.Platform.Services
{
    public interface IProjectBudgetService : IApplicationService
    {
        Task CreateProjectBudgetAsync(ProjectBudgetDto newProjectBudget);
        Task<ListResultDto<ProjectBudgetDto>> GetProjectBudgetByProjectId(string projectId);
        Task UpdateProjectBudgetAsync(Guid id, UpdateProjectBudgetDto updatedProjectBudget);
        Task DeleteProjectBudgetAsync(Guid id);
    }
}
