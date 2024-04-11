namespace Promact.CustomerSuccess.Platform.Services.Dtos.UpdateDto
{
    public class CreateProjectBudgetDto
    {
        public ProjectType Type { get; set; }
        public int DurationInMonths { get; set; }
        public int BudgetedHours { get; set; }

        public required Guid ProjectId { get; set; }
    }
}