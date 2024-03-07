﻿using AutoMapper;
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
        CreateMap<UpdateProjectScopeStackDto, ProjectScopeStack>();
        CreateMap<ProjectScopeStack, ProjectScopeStackDto>().ReverseMap();
        // Mapping Stakeholders
        CreateMap<UpdateStakeholdersDto, Stakeholders>();
        CreateMap<Stakeholders, StakeholdersDto>().ReverseMap();
        // Mapping Risk profile
        CreateMap<UpdateRiskProfileDto, RiskProfile>();
        CreateMap<RiskProfile, RiskProfileDto>().ReverseMap();
        // Mapping Phase milestone
        CreateMap<UpdatePhaseMilestoneDto, PhaseMilestone>();
        CreateMap<PhaseMilestone, PhaseMilestoneDto>().ReverseMap();
        // Mapping Escalation matrix
        CreateMap<UpdateEscalationMatrixDto, EscalationMatrix>();
        CreateMap<EscalationMatrix, EscalationMatrixDto>().ReverseMap();
        // Mapping Sprint
        CreateMap<UpdateSprintDto, Sprint>();
        CreateMap<Sprint, SprintDto>().ReverseMap();
    }
}
