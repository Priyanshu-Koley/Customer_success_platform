using AutoMapper;
using Promact.CustomerSuccess.Platform.Entities;
using Promact.CustomerSuccess.Platform.Services.Dtos;

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
        CreateMap<UpdateProjectBudgetDto, ProjectBudget>();
        CreateMap<ProjectBudget, ProjectBudgetDto>().ReverseMap();
        // Mapping Project scope stack
        CreateMap<CreateProjectScopeStackDto, ProjectScopeStack>();
        CreateMap<UpdateProjectScopeStackDto, VersionHistory>();
        CreateMap<ProjectScopeStack, ProjectScopeStackDto>().ReverseMap();
    }
}
