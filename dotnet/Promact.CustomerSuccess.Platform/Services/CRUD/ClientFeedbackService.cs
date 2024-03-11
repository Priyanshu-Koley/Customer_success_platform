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

namespace Promact.CustomerSuccess.Platform.Services
{
    [RemoteService]
    public class ClientFeedbackService : ApplicationService
    {
        private readonly IRepository<ClientFeedback, Guid> _clientFeedbackRepository;
        private readonly IAsyncQueryableExecuter _asyncExecuter;

        public ClientFeedbackService(IRepository<ClientFeedback, Guid> clientFeedbackRepository, IAsyncQueryableExecuter asyncExecuter)
        {
            _clientFeedbackRepository = clientFeedbackRepository;
            _asyncExecuter = asyncExecuter;
        }

        public async Task CreateClientFeedbackAsync(UpdateClientFeedbackDto newClientFeedback)
        {
            var clientFeedback = ObjectMapper.Map<UpdateClientFeedbackDto, ClientFeedback>(newClientFeedback);
            await _clientFeedbackRepository.InsertAsync(clientFeedback);
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

        public async Task UpdateClientFeedbackAsync(Guid id, UpdateClientFeedbackDto updatedClientFeedback)
        {
            var clientFeedback = await _clientFeedbackRepository.GetAsync(id);
            ObjectMapper.Map(updatedClientFeedback, clientFeedback);
            await _clientFeedbackRepository.UpdateAsync(clientFeedback);
        }

        public async Task DeleteClientFeedbackAsync(Guid id)
        {
            await _clientFeedbackRepository.DeleteAsync(id);
        }
    }
}
