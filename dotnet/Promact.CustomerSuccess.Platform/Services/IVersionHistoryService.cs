using Promact.CustomerSuccess.Platform.Services.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Promact.CustomerSuccess.Platform.Services
{
    public interface IVersionHistoryService : IApplicationService
    {
        Task CreateVersionHistoryAsync(CreateVersionHistoryDto newVersion);
        Task<ListResultDto<VersionHistoryDto>> GetVersionHistoryByProjectId(string projectId);
        Task UpdateVersionHistoryAsync(Guid id, UpdateVersionHistoryDto updatedVersion);
        Task DeleteVersionHistoryAsync(Guid id);
    }
}
