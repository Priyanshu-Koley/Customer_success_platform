﻿using Promact.CustomerSuccess.Platform.Services.Dtos;
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

namespace Promact.CustomerSuccess.Platform.Services
{
    [RemoteService]
    public class StackeholdersService : ApplicationService, IStakeholdersService
    {
        private readonly IRepository<Stakeholders, Guid> _stakeholdersRepository;
        private readonly IAsyncQueryableExecuter _asyncExecuter;

        public StackeholdersService(IRepository<Stakeholders, Guid> stakeholdersRepository, IAsyncQueryableExecuter asyncExecuter)
        {
            _stakeholdersRepository = stakeholdersRepository;
            _asyncExecuter = asyncExecuter;
        }

        public async Task CreateStakeholdersAsync(StakeholdersDto newStakeholders)
        {
            var stakeholders = ObjectMapper.Map<StakeholdersDto, Stakeholders>(newStakeholders);
            await _stakeholdersRepository.InsertAsync(stakeholders);
        }

        public async Task<ListResultDto<StakeholdersDto>> GetStakeholdersByProjectId(string projectId)
        {
            var queryable = await _stakeholdersRepository.GetQueryableAsync();

            var query = queryable
                .Where(p => p.ProjectId == projectId)
                .OrderBy(p => p.CreationTime);

            List<Stakeholders> stakeholders = await _asyncExecuter.ToListAsync(query);

            return new ListResultDto<StakeholdersDto>(ObjectMapper.Map<List<Stakeholders>, List<StakeholdersDto>>(stakeholders)
            );
        }

        public async Task UpdateStakeholdersAsync(Guid id, UpdateStakeholdersDto updatedStakeholders)
        {
            var stakeholders = await _stakeholdersRepository.GetAsync(id);
            ObjectMapper.Map(updatedStakeholders, stakeholders);
            await _stakeholdersRepository.UpdateAsync(stakeholders);
        }

        public async Task DeleteStakeholdersAsync(Guid id)
        {
            await _stakeholdersRepository.DeleteAsync(id);
        }
    }
}