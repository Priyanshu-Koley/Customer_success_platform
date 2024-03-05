using Promact.CustomerSuccess.Platform.Services.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Promact.CustomerSuccess.Platform.Services
{
    public interface IStakeholdersService : IApplicationService
    {
        Task CreateStakeholdersAsync(StakeholdersDto newStakeholder);
        Task<ListResultDto<StakeholdersDto>> GetStakeholdersByProjectId(string projectId);
        Task UpdateStakeholdersAsync(Guid id, UpdateStakeholdersDto updatedStakeholder);
        Task DeleteStakeholdersAsync(Guid id);
    }
}
