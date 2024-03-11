using Promact.CustomerSuccess.Platform.Entities;
using Promact.CustomerSuccess.Platform.Services.Dtos.CreateDto;
using Promact.CustomerSuccess.Platform.Services.Dtos.DbDto;
using Promact.CustomerSuccess.Platform.Services.Dtos.UpdateDto;
using Promact.CustomerSuccess.Platform.Services.ServiceInterface;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Users;
using static Volo.Abp.Identity.Settings.IdentitySettingNames;

namespace Promact.CustomerSuccess.Platform.Services
{
    public class ProjectService(IRepository<Project, Guid> projectRepository) :
        CrudAppService<Project, 
            ProjectDto, 
            Guid, 
            PagedAndSortedResultRequestDto, 
            CreateProjectDto, 
            UpdateProjectDto>(projectRepository), 
        IProjectService
    {

    }
}
