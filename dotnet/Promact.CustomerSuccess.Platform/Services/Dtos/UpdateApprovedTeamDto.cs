﻿using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class UpdateApprovedTeamDto
    {
        public required int PhaseNumber { get; set; }
        public required int NumberOfResources { get; set; }
        public required string Role { get; set; }
        public required float Availability { get; set; }
        public required string Duration { get; set; }
        public string? ProjectId { get; set; }
    }
}
