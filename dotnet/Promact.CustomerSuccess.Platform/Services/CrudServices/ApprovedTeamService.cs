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
using Promact.CustomerSuccess.Platform.Services.Dtos.CreateDto;

namespace Promact.CustomerSuccess.Platform.Services
{
    [RemoteService]
    public class ApprovedTeamService : CrudAppService<ApprovedTeam,
            ApprovedTeamDto,
            Guid,
            PagedAndSortedResultRequestDto,
            CreateApprovedTeamDto,
            UpdateApprovedTeamDto>, 
        IApprovedTeamService
    {
        private readonly IRepository<ApprovedTeam, Guid> _approvedTeamRepository;
        private readonly IAsyncQueryableExecuter _asyncExecuter;

        public ApprovedTeamService(IRepository<ApprovedTeam, Guid> approvedTeamRepository, IAsyncQueryableExecuter asyncExecuter) : base(approvedTeamRepository)
        {
            _approvedTeamRepository = approvedTeamRepository;
            _asyncExecuter = asyncExecuter;
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
    }
}
