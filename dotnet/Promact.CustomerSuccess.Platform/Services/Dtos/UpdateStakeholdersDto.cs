﻿using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class UpdateStakeholdersDto
    {
        public required string Title { get; set; }
        public required string Name { get; set; }
        public required string Contact { get; set; }
    }
}
