namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class UpdateProjectBudgetDto
    {
        public required string Type { get; set; }
        public required int DurationInMonths { get; set; }
        public required int BudgetedHours { get; set; }
    }
}