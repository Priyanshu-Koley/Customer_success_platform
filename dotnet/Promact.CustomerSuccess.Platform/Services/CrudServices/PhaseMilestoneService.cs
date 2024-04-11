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
    public class PhaseMilestoneService : CrudAppService<PhaseMilestone,
        PhaseMilestoneDto,
        Guid,
        PagedAndSortedResultRequestDto,
        CreatePhaseMilestoneDto,
        UpdatePhaseMilestoneDto
        >, IPhaseMilestoneService
    {
        private readonly IRepository<PhaseMilestone, Guid> _phaseMilestoneRepository;
        private readonly IAsyncQueryableExecuter _asyncExecuter;

        public PhaseMilestoneService(IRepository<PhaseMilestone, Guid> phaseMilestoneRepository, IAsyncQueryableExecuter asyncExecuter) : base(phaseMilestoneRepository)
        {
            _phaseMilestoneRepository = phaseMilestoneRepository;
            _asyncExecuter = asyncExecuter;
        }

        public async Task<ListResultDto<PhaseMilestoneDto>> GetPhaseMilestoneByProjectId(string projectId)
        {
            var queryable = await _phaseMilestoneRepository.GetQueryableAsync();

            Guid projectGuid = new Guid(projectId);
            var query = queryable
                .Where(p => p.ProjectId == projectGuid)
                .OrderBy(p => p.CreationTime);

            List<PhaseMilestone> phaseMilestones = await _asyncExecuter.ToListAsync(query);

            return new ListResultDto<PhaseMilestoneDto>(ObjectMapper.Map<List<PhaseMilestone>, List<PhaseMilestoneDto>>(phaseMilestones)
            );
        }
    }
}
