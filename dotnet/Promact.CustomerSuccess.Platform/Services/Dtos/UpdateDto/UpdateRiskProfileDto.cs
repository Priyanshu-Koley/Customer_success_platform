﻿using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos.UpdateDto
{
    public class UpdateRiskProfileDto
    {
        public RiskType? RiskType { get; set; }
        public string? Description { get; set; }
        public RiskSeverity? Severity { get; set; }
        public RiskImpact? Impact { get; set; }
        public string? RemedialSteps { get; set; }
        public DateTime? ClosureDate { get; set; }
    }
}