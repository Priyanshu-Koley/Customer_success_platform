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
    public class RiskProfileService : ApplicationService, IRiskProfileService
    {
        private readonly IRepository<RiskProfile, Guid> _riskProfileRepository;
        private readonly IAsyncQueryableExecuter _asyncExecuter;

        public RiskProfileService(IRepository<RiskProfile, Guid> riskProfileRepository, IAsyncQueryableExecuter asyncExecuter)
        {
            _riskProfileRepository = riskProfileRepository;
            _asyncExecuter = asyncExecuter;
        }

        public async Task CreateRiskProfileAsync(UpdateRiskProfileDto newRiskProfile)
        {
            var riskProfiles = ObjectMapper.Map<UpdateRiskProfileDto, RiskProfile>(newRiskProfile);
            await _riskProfileRepository.InsertAsync(riskProfiles);
        }

        public async Task<ListResultDto<RiskProfileDto>> GetRiskProfileByProjectId(string projectId)
        {
            var queryable = await _riskProfileRepository.GetQueryableAsync();

            Guid projectGuid = new Guid(projectId);
            var query = queryable
                .Where(p => p.ProjectId == projectGuid)
                .OrderBy(p => p.CreationTime);

            List<RiskProfile> riskProfiles = await _asyncExecuter.ToListAsync(query);

            return new ListResultDto<RiskProfileDto>(ObjectMapper.Map<List<RiskProfile>, List<RiskProfileDto>>(riskProfiles)
            );
        }

        public async Task UpdateRiskProfileAsync(Guid id, UpdateRiskProfileDto updatedRiskProfile)
        {
            var riskProfile = await _riskProfileRepository.GetAsync(id);
            ObjectMapper.Map(updatedRiskProfile, riskProfile);
            await _riskProfileRepository.UpdateAsync(riskProfile);
        }

        public async Task DeleteRiskProfileAsync(Guid id)
        {
            await _riskProfileRepository.DeleteAsync(id);
        }
    }
}
