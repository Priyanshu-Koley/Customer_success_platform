using Promact.CustomerSuccess.Platform.Services.Dtos.DbDto;
using Promact.CustomerSuccess.Platform.Services.Dtos.UpdateDto;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Promact.CustomerSuccess.Platform.Services.ServiceInterface
{
    public interface IStakeholdersService : IApplicationService
    {
        Task CreateStakeholdersAsync(UpdateStakeholdersDto newStakeholder);
        Task<ListResultDto<StakeholdersDto>> GetStakeholdersByProjectId(string projectId);
        Task UpdateStakeholdersAsync(Guid id, UpdateStakeholdersDto updatedStakeholder);
        Task DeleteStakeholdersAsync(Guid id);
    }
}
