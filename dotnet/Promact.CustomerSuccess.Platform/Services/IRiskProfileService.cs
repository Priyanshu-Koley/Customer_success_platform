﻿using Promact.CustomerSuccess.Platform.Services.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Promact.CustomerSuccess.Platform.Services
{
    public interface IRiskProfileService : IApplicationService
    {
        Task CreateRiskProfileAsync(UpdateRiskProfileDto newRiskProfile);
        Task<ListResultDto<RiskProfileDto>> GetRiskProfileByProjectId(string projectId);
        Task UpdateRiskProfileAsync(Guid id, UpdateRiskProfileDto updatedRiskProfile);
        Task DeleteRiskProfileAsync(Guid id);
    }
}
