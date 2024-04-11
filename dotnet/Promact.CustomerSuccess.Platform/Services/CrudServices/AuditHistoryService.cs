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
using Promact.CustomerSuccess.Platform.Services.ServiceInterface;
using Promact.CustomerSuccess.Platform.Services.Dtos.CreateDto;
using Promact.CustomerSuccess.Platform.Services.Dtos.UpdateDto;
using Promact.CustomerSuccess.Platform.Services.Dtos.DbDto;

namespace Promact.CustomerSuccess.Platform.Services
{
    [RemoteService]
    public class AuditHistoryService : CrudAppService<AuditHistory,
        AuditHistoryDto,
        Guid,
        PagedAndSortedResultRequestDto,
        CreateAuditHistoryDto,
        UpdateAuditHistoryDto
        >, IAuditHistoryService
    {
        private readonly IRepository<AuditHistory, Guid> _auditHistoryRepository;
        private readonly IAsyncQueryableExecuter _asyncExecuter;

        public AuditHistoryService(IRepository<AuditHistory, Guid> auditHistoryRepository, IAsyncQueryableExecuter asyncExecuter) : base(auditHistoryRepository)
        {
            _auditHistoryRepository = auditHistoryRepository;
            _asyncExecuter = asyncExecuter;
        }

        public async Task<ListResultDto<AuditHistoryDto>> GetAuditHistoryByProjectId(string projectId)
        {
            var queryable = await _auditHistoryRepository.GetQueryableAsync();

            Guid projectGuid = new Guid(projectId);
            var query = queryable
                .Where(p => p.ProjectId == projectGuid)
                .OrderByDescending(p => p.CreationTime);

            List<AuditHistory> auditHistories = await _asyncExecuter.ToListAsync(query);

            return new ListResultDto<AuditHistoryDto>(ObjectMapper.Map<List<AuditHistory>, List<AuditHistoryDto>>(auditHistories));
         }
    }
}
