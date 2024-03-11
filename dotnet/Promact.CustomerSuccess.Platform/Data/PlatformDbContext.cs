using Microsoft.EntityFrameworkCore;
using Promact.CustomerSuccess.Platform.Entities;
using System.Reflection.Emit;
using Volo.Abp.AuditLogging.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore.Modeling;
using Volo.Abp.FeatureManagement.EntityFrameworkCore;
using Volo.Abp.Identity.EntityFrameworkCore;
using Volo.Abp.OpenIddict.EntityFrameworkCore;
using Volo.Abp.PermissionManagement.EntityFrameworkCore;
using Volo.Abp.SettingManagement.EntityFrameworkCore;
using Volo.Abp.TenantManagement.EntityFrameworkCore;

namespace Promact.CustomerSuccess.Platform.Data;

public class PlatformDbContext : AbpDbContext<PlatformDbContext>
{
    public PlatformDbContext(DbContextOptions<PlatformDbContext> options)
        : base(options)
    {
    }

    public DbSet<Project> Projects { get; set; }
    public DbSet<ProjectBudget> ProjectBudgets { get; set; }
    public DbSet<PhaseMilestone> PhaseMilestones { get; set; }
    public DbSet<RiskProfile> RiskProfiles { get; set; }
    public DbSet<EscalationMatrix> EscalationMatrices { get; set; }
    public DbSet<Sprint> Sprints { get; set; }
    public DbSet<AuditHistory> AuditHistory { get; set; }
    public DbSet<VersionHistory> VersionHistory { get; set; }
    public DbSet<ProjectScopeStack> ProjectScopeStacks { get; set; }
    public DbSet<Stakeholders> Stakeholders { get; set; }
    public DbSet<ApprovedTeam> ApprovedTeams { get; set; }
    public DbSet<ProjectResources> ProjectResources { get; set; }
    public DbSet<ClientFeedback> ClientFeedbacks { get; set; }
    public DbSet<ProjectUpdates> ProjectUpdates { get; set; }
    public DbSet<MeetingMinute> MeetingMinutes { get; set; }

    public DbSet<ApplicationUser> Users { get; set; }
    public DbSet<Document> Documents { get; set; }
    public DbSet<DocumentVersion> DocumentVersions { get; set; }
    public DbSet<Organization> Organizations { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        /* Include modules to your migration db context */

        builder.ConfigurePermissionManagement();
        builder.ConfigureSettingManagement();
        builder.ConfigureAuditLogging();
        builder.ConfigureIdentity();
        builder.ConfigureOpenIddict();
        builder.ConfigureFeatureManagement();
        builder.ConfigureTenantManagement();

        /* Configure your own entities here */
        builder.Entity<ApplicationUser>(ApplicationUser =>
        {
            ApplicationUser.ConfigureByConvention();
        });
        builder.Entity<Document>(Document =>
        {
            Document.ConfigureByConvention();
        });
        builder.Entity<DocumentVersion>(entity =>
        {                        
            entity.ConfigureByConvention();
        });
        builder.Entity<Organization>(Organization =>
        {
            Organization.ConfigureByConvention();
        });

        
        builder.Entity<EscalationMatrix>(EscalationMatrix =>
        {            
            EscalationMatrix.ConfigureByConvention();
        });
        builder.Entity<MeetingMinute>(MeetingMinute =>
        {            
            MeetingMinute.ConfigureByConvention();
        });
        builder.Entity<Project>(Project =>
        {
            Project.ConfigureByConvention();

            Project.Property(p => p.Status)
            .HasDefaultValue("progress");
        });
        builder.Entity<ProjectBudget>(ProjectBudget =>
        {
            ProjectBudget.ConfigureByConvention();
        });
        builder.Entity<ProjectResources>(ProjectResources =>
        {
            ProjectResources.ConfigureByConvention();
        });
        builder.Entity<RiskProfile>(RiskProfile =>
        {
            RiskProfile.ConfigureByConvention();
        });
        builder.Entity<Sprint>(Sprint =>
        {
            Sprint.ConfigureByConvention();
        });
        builder.Entity<PhaseMilestone>(PhaseMilestone =>
        {
            PhaseMilestone.ConfigureByConvention();
        });
        builder.Entity<ClientFeedback>(ClientFeedback =>
        {
            ClientFeedback.ConfigureByConvention();
        });
        builder.Entity<AuditHistory>(AuditHistory =>
        {
            AuditHistory.ConfigureByConvention();
            //b.HasOne<Project>()
            //    .WithMany()
            //    .HasForeignKey(a => a.ProjectId)
            //    .IsRequired();
        });
        builder.Entity<VersionHistory>(VersionHistory =>
        {
            VersionHistory.ConfigureByConvention();
        });
        builder.Entity<ProjectScopeStack>(ProjectScopeStack =>
        {
            ProjectScopeStack.ConfigureByConvention();
        });
        builder.Entity<Stakeholders>(Stakeholders =>
        {
            Stakeholders.ConfigureByConvention();
        });
        builder.Entity<ApprovedTeam>(ApprovedTeam =>
        {
            ApprovedTeam.ConfigureByConvention();
        });
        builder.Entity<ProjectUpdates>(ProjectUpdates =>
        {
            ProjectUpdates.ConfigureByConvention();
        });



    }
}
