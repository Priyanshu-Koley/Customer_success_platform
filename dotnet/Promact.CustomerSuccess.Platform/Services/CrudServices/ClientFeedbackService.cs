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
using Volo.Abp.Domain.Entities.Auditing;
using Promact.CustomerSuccess.Platform.Services.ServiceInterface;

namespace Promact.CustomerSuccess.Platform.Services
{
    [RemoteService]
    public class ClientFeedbackService : CrudAppService<ClientFeedback,
        ClientFeedbackDto,
        Guid,
        PagedAndSortedResultRequestDto,
        CreateClientFeedbackDto,
        UpdateClientFeedbackDto
        >, IClientFeedbackService
    {
        private readonly IRepository<ClientFeedback, Guid> _clientFeedbackRepository;
        private readonly IAsyncQueryableExecuter _asyncExecuter;

        public ClientFeedbackService(IRepository<ClientFeedback, Guid> clientFeedbackRepository, IAsyncQueryableExecuter asyncExecuter) : base(clientFeedbackRepository)
        {
            _clientFeedbackRepository = clientFeedbackRepository;
            _asyncExecuter = asyncExecuter;
        }

        public async Task<ListResultDto<ClientFeedbackDto>> GetClientFeedbackByProjectId(string projectId)
        {
            var queryable = await _clientFeedbackRepository.GetQueryableAsync();
            Guid projectGuid = new Guid(projectId);

            var query = queryable
                .Where(p => p.ProjectId == projectGuid)
                .OrderBy(p => p.CreationTime);

            List<ClientFeedback> clientFeedback = await _asyncExecuter.ToListAsync(query);

            return new ListResultDto<ClientFeedbackDto>(ObjectMapper.Map<List<ClientFeedback>, List<ClientFeedbackDto>>(clientFeedback)
            );
        }
    }
}
