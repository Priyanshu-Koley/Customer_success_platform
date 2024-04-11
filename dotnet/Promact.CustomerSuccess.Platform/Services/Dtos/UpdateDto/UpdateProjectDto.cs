using System.ComponentModel.DataAnnotations;

namespace Promact.CustomerSuccess.Platform.Services.Dtos.UpdateDto
{
    public class UpdateProjectDto
    {
        [Required]
        [StringLength(128)]
        public string? Name { get; set; }
        public DateTime? CreationTime { get; set; }
        public string? ProjectManagerId { get; set; }
        public string? ProjectManagerName { get; set; }
        public string? ClientId { get; set; }
        public string? ClientName { get; set; }
        public string? ClientEmail { get; set; }
        public string? Brief { get; set; }
        public string? Purpose { get; set; }
        public string? Goal { get; set; }
        public string? Objective { get; set; }
        public string? TotalBudget { get; set; }
        public int? MembersAssociated { get; set; }
        public string? Status { get; set; }

        public Guid? ProjectId { get; set; }
    }
}
