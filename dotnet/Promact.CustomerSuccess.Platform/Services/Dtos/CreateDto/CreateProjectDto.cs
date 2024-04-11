using Promact.CustomerSuccess.Platform.Entities;
using System.ComponentModel.DataAnnotations;

namespace Promact.CustomerSuccess.Platform.Services.Dtos.CreateDto
{
    public class CreateProjectDto
    {
        [Required]
        [StringLength(128)]
        public required string Name { get; set; }
        public string? Description { get; set; }
        public required string ProjectManagerId { get; set; }
        public required string ProjectManagerName { get; set; }
        public required string ClientId { get; set; }
        public required string ClientName { get; set; }
        public required string ClientEmail { get; set; }
        public string? Brief { get; set; }
        public string? Purpose { get; set; }
        public string? Goal { get; set; }
        public string? Objective { get; set; }
        public int MembersAssociated { get; set; }
    }
}