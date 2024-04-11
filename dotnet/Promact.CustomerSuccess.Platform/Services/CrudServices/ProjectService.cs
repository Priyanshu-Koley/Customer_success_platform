using Microsoft.AspNetCore.Authorization;
using Promact.CustomerSuccess.Platform.Entities;
using Promact.CustomerSuccess.Platform.Services.Dtos.CreateDto;
using Promact.CustomerSuccess.Platform.Services.Dtos.DbDto;
using Promact.CustomerSuccess.Platform.Services.Dtos.UpdateDto;
using Promact.CustomerSuccess.Platform.Services.ServiceInterface;
using Promact.CustomerSuccess.Platform.Services.ServiceInterfaces;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Linq;
using Volo.Abp.Users;
using static Volo.Abp.Identity.Settings.IdentitySettingNames;

namespace Promact.CustomerSuccess.Platform.Services
{
    public class ProjectService :
        CrudAppService<Project, 
            ProjectDto, 
            Guid, 
            PagedAndSortedResultRequestDto, 
            CreateProjectDto, 
            UpdateProjectDto>, 
        IProjectService
    {
        private readonly IRepository<Project, Guid> _projectRepository;
        private readonly IAsyncQueryableExecuter _asyncExecuter;
        public ProjectService(IRepository<Project, Guid> projectRepository, IAsyncQueryableExecuter asyncExecuter) : base(projectRepository)
        {
            _projectRepository = projectRepository;
            _asyncExecuter = asyncExecuter;
        }
        public async Task<ListResultDto<ProjectDto>> GetProjectsByProjectManager(string userId)
        {
            var queryable = await _projectRepository.GetQueryableAsync();
            var query = queryable
                .Where(p => p.ProjectManagerId == userId)
                .OrderBy(p => p.CreationTime);

            List<Project> projects = await _asyncExecuter.ToListAsync(query);

            // Assuming ProjectDto is a mapping of Project, you need to convert projects to ProjectDto
            List<ProjectDto> projectDtos = ObjectMapper.Map<List<Project>, List<ProjectDto>>(projects);

            return new ListResultDto<ProjectDto>(projectDtos);
        }

        public async Task<ListResultDto<ProjectDto>> GetProjectsByClient(string userId)
        {
            var queryable = await _projectRepository.GetQueryableAsync();
            var query = queryable
                .Where(p => p.ClientId == userId)
                .OrderBy(p => p.CreationTime);

            List<Project> projects = await _asyncExecuter.ToListAsync(query);

            return new ListResultDto<ProjectDto>(ObjectMapper.Map<List<Project>, List<ProjectDto>>(projects)
            );
        }
    }
}
