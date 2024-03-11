using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos.UpdateDto
{
    public class UpdateEscalationMatrixDto
    {
        public EscalationMatrixLevels? Level { get; set; }
        public EscalationType? EscalationType { get; set; }
        public string? Responsible { get; set; }

        public Guid? ProjectId { get; set; }
    }
}