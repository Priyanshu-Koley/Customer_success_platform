using AutoMapper;
using Promact.CustomerSuccess.Platform.Entities;
using Promact.CustomerSuccess.Platform.Services.Dtos.CreateDto;
using Promact.CustomerSuccess.Platform.Services.Dtos.DbDto;
using Promact.CustomerSuccess.Platform.Services.Dtos.UpdateDto;

namespace Promact.CustomerSuccess.Platform.ObjectMapping;

public class PlatformAutoMapperProfile : Profile
{
    public PlatformAutoMapperProfile()
    {
        /* Create your AutoMapper object mappings here */
        // Mapping Project
        CreateMap<CreateProjectDto, Project>();
        CreateMap<UpdateProjectDto, Project>();
        CreateMap<Project, ProjectDto>().ReverseMap();
        // Mapping Audit History
        CreateMap<CreateAuditHistoryDto, AuditHistory>();
        CreateMap<UpdateAuditHistoryDto, AuditHistory>();
        CreateMap<AuditHistory, AuditHistoryDto>().ReverseMap();
        // Mapping Version History
        CreateMap<CreateVersionHistoryDto, VersionHistory>();
        CreateMap<UpdateVersionHistoryDto, VersionHistory>();
        CreateMap<VersionHistory, VersionHistoryDto>().ReverseMap();
        // Mapping Project budget
        CreateMap<CreateProjectBudgetDto, ProjectBudget>();
        CreateMap<UpdateProjectBudgetDto, ProjectBudget>();
        CreateMap<ProjectBudget, ProjectBudgetDto>().ReverseMap();
        // Mapping Project scope stack
        CreateMap<CreateProjectScopeStackDto, ProjectScopeStack>();
        CreateMap<UpdateProjectScopeStackDto, ProjectScopeStack>();
        CreateMap<ProjectScopeStack, ProjectScopeStackDto>().ReverseMap();
        // Mapping Stakeholders
        CreateMap<CreateStakeholdersDto, Stakeholders>();
        CreateMap<UpdateStakeholdersDto, Stakeholders>();
        CreateMap<Stakeholders, StakeholdersDto>().ReverseMap();
        // Mapping Risk profile
        CreateMap<CreateRiskProfileDto, RiskProfile>();
        CreateMap<UpdateRiskProfileDto, RiskProfile>();
        CreateMap<RiskProfile, RiskProfileDto>().ReverseMap();
        // Mapping Phase milestone
        CreateMap<CreatePhaseMilestoneDto, PhaseMilestone>();
        CreateMap<UpdatePhaseMilestoneDto, PhaseMilestone>();
        CreateMap<PhaseMilestone, PhaseMilestoneDto>().ReverseMap();
        // Mapping Escalation matrix
        CreateMap<CreateEscalationMatrixDto, EscalationMatrix>();
        CreateMap<UpdateEscalationMatrixDto, EscalationMatrix>();
        CreateMap<EscalationMatrix, EscalationMatrixDto>().ReverseMap();
        // Mapping Sprint
        CreateMap<CreateSprintDto, Sprint>();
        CreateMap<UpdateSprintDto, Sprint>();
        CreateMap<Sprint, SprintDto>().ReverseMap();
        // Mapping Approved team
        CreateMap<UpdateApprovedTeamDto, ApprovedTeam>();
        CreateMap<CreateApprovedTeamDto, ApprovedTeam>();
        CreateMap<ApprovedTeam, ApprovedTeamDto>().ReverseMap();
        // Mapping Project Resource
        CreateMap<CreateProjectResourcesDto, ProjectResources>();
        CreateMap<UpdateProjectResourcesDto, ProjectResources>();
        CreateMap<ProjectResources, ProjectResourcesDto>().ReverseMap();
        // Mapping Client Feedback
        CreateMap<CreateClientFeedbackDto, ClientFeedback>();
        CreateMap<UpdateClientFeedbackDto, ClientFeedback>();
        CreateMap<ClientFeedback, ClientFeedbackDto>().ReverseMap();
        // Mapping Project updates
        CreateMap<CreateProjectUpdatesDto, ProjectUpdates>();
        CreateMap<UpdateProjectUpdatesDto, ProjectUpdates>();
        CreateMap<ProjectUpdates, ProjectUpdatesDto>().ReverseMap();
        // Mapping Meeting minute
        CreateMap<CreateMeetingMinuteDto, MeetingMinute>();
        CreateMap<UpdateMeetingMinuteDto, MeetingMinute>();
        CreateMap<MeetingMinute, MeetingMinuteDto>().ReverseMap();
    }
}
