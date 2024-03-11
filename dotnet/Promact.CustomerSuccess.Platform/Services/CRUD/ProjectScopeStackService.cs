using Promact.CustomerSuccess.Platform.Entities;
using System;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using System.Xml.Linq;
using Volo.Abp.Linq;
using Volo.Abp.ObjectMapping;
using Promact.CustomerSuccess.Platform.Services.ServiceInterface;
using Promact.CustomerSuccess.Platform.Services.Dtos.UpdateDto;
using Promact.CustomerSuccess.Platform.Services.Dtos.DbDto;

namespace Promact.CustomerSuccess.Platform.Services
{
    [RemoteService]
    public class ProjectScopeStackService : ApplicationService, IProjectScopeStackService
    {
        private readonly IRepository<ProjectScopeStack, Guid> _projectScopeStackRepository;
        private readonly IAsyncQueryableExecuter _asyncExecuter;

        public ProjectScopeStackService(IRepository<ProjectScopeStack, Guid> projectScopeStackRepository, IAsyncQueryableExecuter asyncExecuter)
        {
            _projectScopeStackRepository = projectScopeStackRepository;
            _asyncExecuter = asyncExecuter;
        }

        public async Task CreateProjectScopeStackAsync(ProjectScopeStackDto newProjectScopeStack)
        {
            var projectScopeStack = ObjectMapper.Map<ProjectScopeStackDto, ProjectScopeStack>(newProjectScopeStack);
            await _projectScopeStackRepository.InsertAsync(projectScopeStack);
        }

        public async Task<ListResultDto<ProjectScopeStackDto>> GetProjectScopeStackByProjectId(string projectId)
        {
            var queryable = await _projectScopeStackRepository.GetQueryableAsync();

            Guid projectGuid = new Guid(projectId);
            var query = queryable
                .Where(p => p.ProjectId == projectGuid)
                .OrderBy(p => p.CreationTime);

            List<ProjectScopeStack> projectScopeStack = await _asyncExecuter.ToListAsync(query);

            return new ListResultDto<ProjectScopeStackDto>(ObjectMapper.Map<List<ProjectScopeStack>, List<ProjectScopeStackDto>>(projectScopeStack)
            );
        }

        public async Task UpdateProjectScopeStackAsync(Guid id, UpdateProjectScopeStackDto updatedProjectScopeStack)
        {
            var projectScopeStack = await _projectScopeStackRepository.GetAsync(id);
            ObjectMapper.Map(updatedProjectScopeStack, projectScopeStack);
            await _projectScopeStackRepository.UpdateAsync(projectScopeStack);
        }

        public async Task DeleteProjectScopeStackAsync(Guid id)
        {
            await _projectScopeStackRepository.DeleteAsync(id);
        }
    }
}
