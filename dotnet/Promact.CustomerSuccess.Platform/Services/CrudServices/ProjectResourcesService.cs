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
using Promact.CustomerSuccess.Platform.Services.Dtos.UpdateDto;
using Promact.CustomerSuccess.Platform.Services.Dtos.DbDto;
using Promact.CustomerSuccess.Platform.Services.ServiceInterface;

namespace Promact.CustomerSuccess.Platform.Services
{
    [RemoteService]
    public class ProjectResourcesService : CrudAppService<ProjectResources,
        ProjectResourcesDto,
        Guid,
        PagedAndSortedResultRequestDto,
        CreateProjectResourcesDto,
        UpdateProjectResourcesDto
        >, IProjectResourcesService
    {
        private readonly IRepository<ProjectResources, Guid> _projectResourcesRepository;
        private readonly IAsyncQueryableExecuter _asyncExecuter;

        public ProjectResourcesService(IRepository<ProjectResources, Guid> projectResourcesRepository, IAsyncQueryableExecuter asyncExecuter) : base(projectResourcesRepository)
        {
            _projectResourcesRepository = projectResourcesRepository;
            _asyncExecuter = asyncExecuter;
        }

        public async Task<ListResultDto<ProjectResourcesDto>> GetProjectResourcesByProjectId(string projectId)
        {
            var queryable = await _projectResourcesRepository.GetQueryableAsync();
            Guid projectGuid = new Guid(projectId);

            var query = queryable
                .Where(p => p.ProjectId == projectGuid)
                .OrderBy(p => p.CreationTime);

            List<ProjectResources> projectResources = await _asyncExecuter.ToListAsync(query);

            return new ListResultDto<ProjectResourcesDto>(ObjectMapper.Map<List<ProjectResources>, List<ProjectResourcesDto>>(projectResources)
            );
        }
    }
}
