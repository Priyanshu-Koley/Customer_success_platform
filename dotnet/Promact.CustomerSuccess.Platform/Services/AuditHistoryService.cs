using Promact.CustomerSuccess.Platform.Entities;
using Promact.CustomerSuccess.Platform.Services.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Users;
using static Volo.Abp.Identity.Settings.IdentitySettingNames;

namespace Promact.CustomerSuccess.Platform.Services
{
    public class AuditHistoryService(IRepository<AuditHistory, Guid> auditHistoryRepository) :
        CrudAppService<AuditHistory, 
            AuditHistoryDto, 
            Guid, 
            PagedAndSortedResultRequestDto,
            CreateAuditHistoryDto>(auditHistoryRepository), 
        IAuditHistoryService
    {

    }
}
