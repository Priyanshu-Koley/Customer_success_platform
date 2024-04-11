using Promact.CustomerSuccess.Platform.Services.Dtos;
using Promact.CustomerSuccess.Platform.Services.Dtos.DbDto;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Promact.CustomerSuccess.Platform.Services.ServiceInterfaces
{
    public interface IProjectService : IApplicationService
    {
        Task<ListResultDto<ProjectDto>> GetProjectsByProjectManager(string userId);
        Task<ListResultDto<ProjectDto>> GetProjectsByClient(string userId);
    }
}
