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
    public class StakeholdersService : CrudAppService<Stakeholders,
        StakeholdersDto,
        Guid,
        PagedAndSortedResultRequestDto,
        CreateStakeholdersDto,
        UpdateStakeholdersDto
        >, IStakeholdersService
    {
        private readonly IRepository<Stakeholders, Guid> _stakeholdersRepository;
        private readonly IAsyncQueryableExecuter _asyncExecuter;

        public StakeholdersService(IRepository<Stakeholders, Guid> stakeholdersRepository, IAsyncQueryableExecuter asyncExecuter) : base(stakeholdersRepository)
        {
            _stakeholdersRepository = stakeholdersRepository;
            _asyncExecuter = asyncExecuter;
        }

        public async Task<ListResultDto<StakeholdersDto>> GetStakeholdersByProjectId(string projectId)
        {
            var queryable = await _stakeholdersRepository.GetQueryableAsync();

            Guid projectGuid = new Guid(projectId);
            var query = queryable
                .Where(p => p.ProjectId == projectGuid)
                .OrderBy(p => p.CreationTime);

            List<Stakeholders> stakeholders = await _asyncExecuter.ToListAsync(query);

            return new ListResultDto<StakeholdersDto>(ObjectMapper.Map<List<Stakeholders>, List<StakeholdersDto>>(stakeholders)
            );
        }
    }
}
