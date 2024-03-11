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
    public class SprintService : ApplicationService
    {
        private readonly IRepository<Sprint, Guid> _sprintRepository;
        private readonly IAsyncQueryableExecuter _asyncExecuter;

        public SprintService(IRepository<Sprint, Guid> sprintRepository, IAsyncQueryableExecuter asyncExecuter)
        {
            _sprintRepository = sprintRepository;
            _asyncExecuter = asyncExecuter;
        }

        public async Task CreateSprintAsync(UpdateSprintDto newSprint)
        {
            var sprint = ObjectMapper.Map<UpdateSprintDto, Sprint>(newSprint);
            await _sprintRepository.InsertAsync(sprint);
        }

        public async Task<ListResultDto<SprintDto>> GetSprintByProjectId(string projectId)
        {
            var queryable = await _sprintRepository.GetQueryableAsync();

            Guid projectGuid = new Guid(projectId);
            var query = queryable
                .Where(p => p.ProjectId == projectGuid)
                .OrderBy(p => p.CreationTime);

            List<Sprint> sprint = await _asyncExecuter.ToListAsync(query);

            return new ListResultDto<SprintDto>(ObjectMapper.Map<List<Sprint>, List<SprintDto>>(sprint)
            );
        }

        public async Task UpdateSprintAsync(Guid id, UpdateSprintDto updatedSprint)
        {
            var sprint = await _sprintRepository.GetAsync(id);
            ObjectMapper.Map(updatedSprint, sprint);
            await _sprintRepository.UpdateAsync(sprint);
        }

        public async Task DeleteSprintAsync(Guid id)
        {
            await _sprintRepository.DeleteAsync(id);
        }
    }
}
