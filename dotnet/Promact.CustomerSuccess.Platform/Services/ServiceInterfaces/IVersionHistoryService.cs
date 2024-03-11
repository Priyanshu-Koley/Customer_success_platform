using Promact.CustomerSuccess.Platform.Services.Dtos.CreateDto;
using Promact.CustomerSuccess.Platform.Services.Dtos.DbDto;
using Promact.CustomerSuccess.Platform.Services.Dtos.UpdateDto;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Promact.CustomerSuccess.Platform.Services.ServiceInterface
{
    public interface IVersionHistoryService : IApplicationService
    {
        Task CreateVersionHistoryAsync(CreateVersionHistoryDto newVersion);
        Task<ListResultDto<VersionHistoryDto>> GetVersionHistoryByProjectId(string projectId);
        Task UpdateVersionHistoryAsync(Guid id, UpdateVersionHistoryDto updatedVersion);
        Task DeleteVersionHistoryAsync(Guid id);
    }
}
