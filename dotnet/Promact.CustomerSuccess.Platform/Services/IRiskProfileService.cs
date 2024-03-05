using Promact.CustomerSuccess.Platform.Services.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Promact.CustomerSuccess.Platform.Services
{
    public interface IRiskProfileService : IApplicationService
    {
        Task CreateRiskProfileAsync(RiskProfileDto newRiskProfile);
        Task<ListResultDto<RiskProfileDto>> GetRiskProfileByProjectId(string projectId);
        Task UpdateRiskProfileAsync(Guid id, RiskProfileDto updatedRiskProfile);
        Task DeleteRiskProfileAsync(Guid id);
    }
}
