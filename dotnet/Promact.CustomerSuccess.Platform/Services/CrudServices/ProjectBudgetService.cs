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
    public class ProjectBudgetService : CrudAppService<ProjectBudget,
        ProjectBudgetDto,
        Guid,
        PagedAndSortedResultRequestDto,
        CreateProjectBudgetDto,
        UpdateProjectBudgetDto
        >, IProjectBudgetService
    {
        private readonly IRepository<ProjectBudget, Guid> _projectBudgetRepository;
        private readonly IAsyncQueryableExecuter _asyncExecuter;

        public ProjectBudgetService(IRepository<ProjectBudget, Guid> projectBudgetRepository, IAsyncQueryableExecuter asyncExecuter) : base(projectBudgetRepository)
        {
            _projectBudgetRepository = projectBudgetRepository;
            _asyncExecuter = asyncExecuter;
        }

        public async Task<ListResultDto<ProjectBudgetDto>> GetProjectBudgetByProjectId(string projectId)
        {
            var queryable = await _projectBudgetRepository.GetQueryableAsync();

            Guid projectGuid = new Guid(projectId);
            var query = queryable
                .Where(p => p.ProjectId == projectGuid)
                .OrderBy(p => p.CreationTime);

            List<ProjectBudget> projectBudget = await _asyncExecuter.ToListAsync(query);

            return new ListResultDto<ProjectBudgetDto>(ObjectMapper.Map<List<ProjectBudget>, List<ProjectBudgetDto>>(projectBudget)
            );
        }
    }
}
