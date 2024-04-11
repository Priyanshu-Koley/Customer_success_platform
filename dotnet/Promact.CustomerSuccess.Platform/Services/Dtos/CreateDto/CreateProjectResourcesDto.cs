namespace Promact.CustomerSuccess.Platform.Services.Dtos.DbDto
{
    public class CreateProjectResourcesDto
    {
        public string? Name { get; set; }
        public double AllocationPercentage { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public string? Role { get; set; }
        public string? Comments { get; set; }

        public required Guid ProjectId { get; set; }
    }
}