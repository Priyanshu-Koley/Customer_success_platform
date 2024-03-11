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
    public class MeetingMinuteService : ApplicationService
    {
        private readonly IRepository<MeetingMinute, Guid> _meetingMinuteRepository;
        private readonly IAsyncQueryableExecuter _asyncExecuter;

        public MeetingMinuteService(IRepository<MeetingMinute, Guid> meetingMinuteRepository, IAsyncQueryableExecuter asyncExecuter)
        {
            _meetingMinuteRepository = meetingMinuteRepository;
            _asyncExecuter = asyncExecuter;
        }

        public async Task CreateMeetingMinuteAsync(UpdateMeetingMinuteDto newMeetingMinute)
        {
            var meetingMinute = ObjectMapper.Map<UpdateMeetingMinuteDto, MeetingMinute>(newMeetingMinute);
            await _meetingMinuteRepository.InsertAsync(meetingMinute);
        }

        public async Task<ListResultDto<MeetingMinuteDto>> GetMeetingMinuteByProjectId(string projectId)
        {
            var queryable = await _meetingMinuteRepository.GetQueryableAsync();
            Guid projectGuid = new Guid(projectId);

            var query = queryable
                .Where(p => p.ProjectId == projectGuid)
                .OrderBy(p => p.CreationTime);

            List<MeetingMinute> meetingMinute = await _asyncExecuter.ToListAsync(query);

            return new ListResultDto<MeetingMinuteDto>(ObjectMapper.Map<List<MeetingMinute>, List<MeetingMinuteDto>>(meetingMinute)
            );
        }

        public async Task UpdateMeetingMinuteAsync(Guid id, UpdateMeetingMinuteDto updatedMeetingMinute)
        {
            var meetingMinute = await _meetingMinuteRepository.GetAsync(id);
            ObjectMapper.Map(updatedMeetingMinute, meetingMinute);
            await _meetingMinuteRepository.UpdateAsync(meetingMinute);
        }

        public async Task DeleteMeetingMinuteAsync(Guid id)
        {
            await _meetingMinuteRepository.DeleteAsync(id);
        }
    }
}
