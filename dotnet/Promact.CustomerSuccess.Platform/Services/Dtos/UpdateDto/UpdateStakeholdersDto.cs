﻿using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos.UpdateDto
{
    public class UpdateStakeholdersDto
    {
        public required Guid UserID { get; set; }
        public required string Title { get; set; }
        public required string Name { get; set; }
        public required string Contact { get; set; }

        public Guid? ProjectId { get; set; }
    }
}
