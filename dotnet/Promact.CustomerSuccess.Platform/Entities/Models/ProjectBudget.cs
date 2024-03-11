using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Volo.Abp.Domain.Entities.Auditing;

namespace Promact.CustomerSuccess.Platform.Entities
{
    public class ProjectBudget : AuditedEntity<Guid>
    {
        //public ProjectType Type { get; set; }
        public required ProjectType Type { get; set; }
        public required int DurationInMonths { get; set; }
        public required int BudgetedHours { get; set; }
        
        public int? ContractDuration { get; set; }
        public double? BudgetedCost { get; set; }
        public string? Currency { get; set; }
        
        public required Guid ProjectId { get; set; }

        //[ForeignKey(nameof(Project))]
        //public virtual Project? Project { get; set; }
        //public override object?[] GetKeys()
        //{
        //    //Implement IReadOnlyEntityType.GetKeys Method to return the keys of the entity.
        //    return new object[] { nameof(Type) };

        //}
    }
}
