namespace Promact.CustomerSuccess.Platform.Services.Dtos.UpdateDto
{
    public class UpdateProjectBudgetDto
    {
        public ProjectType? Type { get; set; }
        public int? DurationInMonths { get; set; }
        public int? BudgetedHours { get; set; }

        public Guid? ProjectId { get; set; }
    }
}