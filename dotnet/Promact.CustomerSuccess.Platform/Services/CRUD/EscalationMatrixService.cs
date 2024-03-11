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
    public class EscalationMatrixService : ApplicationService
    {
        private readonly IRepository<EscalationMatrix, Guid> _escalationMatrixRepository;
        private readonly IAsyncQueryableExecuter _asyncExecuter;

        public EscalationMatrixService(IRepository<EscalationMatrix, Guid> escalationMatrixRepository, IAsyncQueryableExecuter asyncExecuter)
        {
            _escalationMatrixRepository = escalationMatrixRepository;
            _asyncExecuter = asyncExecuter;
        }

        public async Task CreateEscalationMatrixAsync(UpdateEscalationMatrixDto newEscalationMatrix)
        {
            var escalationMatrix = ObjectMapper.Map<UpdateEscalationMatrixDto, EscalationMatrix>(newEscalationMatrix);
            await _escalationMatrixRepository.InsertAsync(escalationMatrix);
        }

        public async Task<ListResultDto<EscalationMatrixDto>> GetEscalationMatrixByProjectId(string projectId)
        {
            var queryable = await _escalationMatrixRepository.GetQueryableAsync();

            Guid projectGuid = new Guid(projectId);
            var query = queryable
                .Where(p => p.ProjectId == projectGuid)
                .OrderBy(p => p.Level);

            List<EscalationMatrix> escalationMatrix = await _asyncExecuter.ToListAsync(query);

            return new ListResultDto<EscalationMatrixDto>(ObjectMapper.Map<List<EscalationMatrix>, List<EscalationMatrixDto>>(escalationMatrix)
            );
        }

        public async Task UpdateEscalationMatrixAsync(Guid id, UpdateEscalationMatrixDto updatedEscalationMatrix)
        {
            var escalationMatrix = await _escalationMatrixRepository.GetAsync(id);
            ObjectMapper.Map(updatedEscalationMatrix, escalationMatrix);
            await _escalationMatrixRepository.UpdateAsync(escalationMatrix);
        }

        public async Task DeleteEscalationMatrixAsync(Guid id)
        {
            await _escalationMatrixRepository.DeleteAsync(id);
        }
    }
}
