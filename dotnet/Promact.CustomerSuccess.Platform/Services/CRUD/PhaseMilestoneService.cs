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

namespace Promact.CustomerSuccess.Platform.Services
{
    [RemoteService]
    public class PhaseMilestoneService : ApplicationService
    {
        private readonly IRepository<PhaseMilestone, Guid> _phaseMilestoneRepository;
        private readonly IAsyncQueryableExecuter _asyncExecuter;

        public PhaseMilestoneService(IRepository<PhaseMilestone, Guid> phaseMilestoneRepository, IAsyncQueryableExecuter asyncExecuter)
        {
            _phaseMilestoneRepository = phaseMilestoneRepository;
            _asyncExecuter = asyncExecuter;
        }

        public async Task CreatePhaseMilestoneAsync(UpdatePhaseMilestoneDto newPhaseMilestone)
        {
            var phaseMilestone = ObjectMapper.Map<UpdatePhaseMilestoneDto, PhaseMilestone>(newPhaseMilestone);
            await _phaseMilestoneRepository.InsertAsync(phaseMilestone);
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

        public async Task UpdatePhaseMilestoneAsync(Guid id, UpdatePhaseMilestoneDto updatedPhaseMilestone)
        {
            var phaseMilestone = await _phaseMilestoneRepository.GetAsync(id);
            ObjectMapper.Map(updatedPhaseMilestone, phaseMilestone);
            await _phaseMilestoneRepository.UpdateAsync(phaseMilestone);
        }

        public async Task DeletePhaseMilestoneAsync(Guid id)
        {
            await _phaseMilestoneRepository.DeleteAsync(id);
        }
    }
}
