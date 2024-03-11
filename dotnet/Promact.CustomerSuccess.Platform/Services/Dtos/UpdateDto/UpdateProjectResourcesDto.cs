namespace Promact.CustomerSuccess.Platform.Services.Dtos.DbDto
{
    public class UpdateProjectResourcesDto
    {
        public required double AllocationPercentage { get; set; }
        public required DateTime Start { get; set; }
        public required DateTime End { get; set; }
        public required string Role { get; set; }
        public required string Comments { get; set; }

        public Guid? ProjectId { get; set; }
    }
}