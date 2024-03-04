using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class ProjectBudgetDto : IEntityDto<Guid>
    {
        public Guid Id { get; set; }
        public required string Type { get; set; }
        public required int DurationInMonths { get; set; }
        public required int BudgetedHours { get; set; }
        public required string ProjectId { get; set; }
    }
}