﻿using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class SprintDto : IEntityDto<Guid>
    {
        public Guid Id { get; set; }
        public int SprintNumber { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public required string Status { get; set; }
        public required string Comments { get; set; }
        public string? ProjectId { get; set; }
    }
}