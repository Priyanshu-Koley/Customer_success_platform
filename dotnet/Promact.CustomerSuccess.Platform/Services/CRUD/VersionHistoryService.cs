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
using Promact.CustomerSuccess.Platform.Services.ServiceInterface;
using Promact.CustomerSuccess.Platform.Services.Dtos.CreateDto;
using Promact.CustomerSuccess.Platform.Services.Dtos.UpdateDto;
using Promact.CustomerSuccess.Platform.Services.Dtos.DbDto;

namespace Promact.CustomerSuccess.Platform.Services
{
    [RemoteService]
    public class VersionHistoryService : ApplicationService, IVersionHistoryService
    {
        private readonly IRepository<VersionHistory, Guid> _versionHistoryRepository;
        private readonly IAsyncQueryableExecuter _asyncExecuter;

        public VersionHistoryService(IRepository<VersionHistory, Guid> versionHistoryRepository, IAsyncQueryableExecuter asyncExecuter)
        {
            _versionHistoryRepository = versionHistoryRepository;
            _asyncExecuter = asyncExecuter;
        }

        public async Task CreateVersionHistoryAsync(CreateVersionHistoryDto newVersion)
        {
            var versionHistory = ObjectMapper.Map<CreateVersionHistoryDto, VersionHistory>(newVersion);
            await _versionHistoryRepository.InsertAsync(versionHistory);
        }

        public async Task<ListResultDto<VersionHistoryDto>> GetVersionHistoryByProjectId(string projectId)
        {
            var queryable = await _versionHistoryRepository.GetQueryableAsync();

            Guid projectGuid = new Guid(projectId);
            var query = queryable
                .Where(p => p.ProjectId == projectGuid)
                .OrderByDescending(p => p.CreationTime);

            List<VersionHistory> versionHistoryDto = await _asyncExecuter.ToListAsync(query);

            return new ListResultDto<VersionHistoryDto>(ObjectMapper.Map<List<VersionHistory>, List<VersionHistoryDto>>(versionHistoryDto)
            );
        }

        public async Task UpdateVersionHistoryAsync(Guid id, UpdateVersionHistoryDto updatedVersion)
        {
            var versionHistory = await _versionHistoryRepository.GetAsync(id);
            ObjectMapper.Map(updatedVersion, versionHistory);
            await _versionHistoryRepository.UpdateAsync(versionHistory);
        }

        public async Task DeleteVersionHistoryAsync(Guid id)
        {
            await _versionHistoryRepository.DeleteAsync(id);
        }
    }
}
