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
    public class ApprovedTeamService : ApplicationService
    {
        private readonly IRepository<ApprovedTeam, Guid> _approvedTeamRepository;
        private readonly IAsyncQueryableExecuter _asyncExecuter;

        public ApprovedTeamService(IRepository<ApprovedTeam, Guid> approvedTeamRepository, IAsyncQueryableExecuter asyncExecuter)
        {
            _approvedTeamRepository = approvedTeamRepository;
            _asyncExecuter = asyncExecuter;
        }

        public async Task CreateApprovedTeamAsync(UpdateApprovedTeamDto newApprovedTeam)
        {
            var approvedTeam = ObjectMapper.Map<UpdateApprovedTeamDto, ApprovedTeam>(newApprovedTeam);
            await _approvedTeamRepository.InsertAsync(approvedTeam);
        }

        public async Task<ListResultDto<ApprovedTeamDto>> GetApprovedTeamByProjectId(string projectId)
        {
            var queryable = await _approvedTeamRepository.GetQueryableAsync();
            Guid projectGuid = new Guid(projectId);
            var query = queryable
                .Where(p => p.ProjectId == projectGuid)
                .OrderBy(p => p.CreationTime);

            List<ApprovedTeam> approvedTeam = await _asyncExecuter.ToListAsync(query);

            return new ListResultDto<ApprovedTeamDto>(ObjectMapper.Map<List<ApprovedTeam>, List<ApprovedTeamDto>>(approvedTeam)
            );
        }

        public async Task UpdateApprovedTeamAsync(Guid id, UpdateApprovedTeamDto updatedApprovedTeam)
        {
            var approvedTeam = await _approvedTeamRepository.GetAsync(id);
            ObjectMapper.Map(updatedApprovedTeam, approvedTeam);
            await _approvedTeamRepository.UpdateAsync(approvedTeam);
        }

        public async Task DeleteApprovedTeamAsync(Guid id)
        {
            await _approvedTeamRepository.DeleteAsync(id);
        }
    }
}
