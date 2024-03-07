using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class UpdateRiskProfileDto
    { 
        public required string RiskType { get; set; }
        public required string Description { get; set; }
        public required string Severity { get; set; }
        public required string Impact { get; set; }
        public required string RemedialSteps { get; set; }
        public required string Status { get; set; }
        public required string ClosureDate { get; set; }
        public string? ProjectId { get; set; }

    }
}