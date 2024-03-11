using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos.DbDto
{
    public class ProjectBudgetDto : IEntityDto<Guid>
    {
        public Guid Id { get; set; }
        public required ProjectType Type { get; set; }
        public required int DurationInMonths { get; set; }
        public required int BudgetedHours { get; set; }
        
        public required Guid ProjectId { get; set; }
    }
}