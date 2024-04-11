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
using Volo.Abp.Domain.Entities.Auditing;
using Promact.CustomerSuccess.Platform.Services.ServiceInterface;
using Promact.CustomerSuccess.Platform.Services.Dtos.CreateDto;

namespace Promact.CustomerSuccess.Platform.Services
{
    [RemoteService]
    public class ProjectUpdatesService : CrudAppService<ProjectUpdates,
        ProjectUpdatesDto,
        Guid,
        PagedAndSortedResultRequestDto,
        CreateProjectUpdatesDto,
        UpdateProjectUpdatesDto
        >, IProjectUpdatesService
    {
        private readonly IRepository<ProjectUpdates, Guid> _projectUpdatesRepository;
        private readonly IAsyncQueryableExecuter _asyncExecuter;

        public ProjectUpdatesService(IRepository<ProjectUpdates, Guid> projectUpdatesRepository, IAsyncQueryableExecuter asyncExecuter) : base(projectUpdatesRepository)
        {
            _projectUpdatesRepository = projectUpdatesRepository;
            _asyncExecuter = asyncExecuter;
        }

        public async Task<ListResultDto<ProjectUpdatesDto>> GetProjectUpdatesByProjectId(string projectId)
        {
            var queryable = await _projectUpdatesRepository.GetQueryableAsync();
            Guid projectGuid = new Guid(projectId);

            var query = queryable
                .Where(p => p.ProjectId == projectGuid)
                .OrderBy(p => p.CreationTime);

            List<ProjectUpdates> projectUpdates = await _asyncExecuter.ToListAsync(query);

            return new ListResultDto<ProjectUpdatesDto>(ObjectMapper.Map<List<ProjectUpdates>, List<ProjectUpdatesDto>>(projectUpdates)
            );
        }
    }
}
