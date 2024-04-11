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
    public class EscalationMatrixService : CrudAppService<EscalationMatrix,
        EscalationMatrixDto,
        Guid,
        PagedAndSortedResultRequestDto,
        CreateEscalationMatrixDto,
        UpdateEscalationMatrixDto
        >, IEscalationMatrixService
    {
        private readonly IRepository<EscalationMatrix, Guid> _escalationMatrixRepository;
        private readonly IAsyncQueryableExecuter _asyncExecuter;

        public EscalationMatrixService(IRepository<EscalationMatrix, Guid> escalationMatrixRepository, IAsyncQueryableExecuter asyncExecuter) : base(escalationMatrixRepository)
        {
            _escalationMatrixRepository = escalationMatrixRepository;
            _asyncExecuter = asyncExecuter;
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
    }
}
