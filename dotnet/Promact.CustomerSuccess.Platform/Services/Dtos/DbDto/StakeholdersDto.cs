using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos.DbDto
{
    public class StakeholdersDto : IEntityDto<Guid>
    {
        public Guid Id { get; set; }
        public required string UserID { get; set; }
        public required string Title { get; set; }
        public required string Name { get; set; }
        public required string Contact { get; set; }


        public required Guid ProjectId { get; set; }
    }
}
