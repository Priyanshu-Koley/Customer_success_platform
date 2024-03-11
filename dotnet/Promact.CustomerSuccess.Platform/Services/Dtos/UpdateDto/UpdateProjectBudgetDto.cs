namespace Promact.CustomerSuccess.Platform.Services.Dtos.UpdateDto
{
    public class UpdateProjectBudgetDto
    {
        public required ProjectType Type { get; set; }
        public required int DurationInMonths { get; set; }
        public required int BudgetedHours { get; set; }

        public Guid? ProjectId { get; set; }
    }
}