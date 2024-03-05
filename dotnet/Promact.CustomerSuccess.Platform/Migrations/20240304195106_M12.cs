using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Promact.CustomerSuccess.Platform.Migrations
{
    /// <inheritdoc />
    public partial class M12 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectBudgets_Projects_ProjectId1",
                table: "ProjectBudgets");

            migrationBuilder.DropForeignKey(
                name: "FK_RiskProfiles_Projects_ProjectId1",
                table: "RiskProfiles");

            migrationBuilder.DropIndex(
                name: "IX_RiskProfiles_ProjectId1",
                table: "RiskProfiles");

            migrationBuilder.DropIndex(
                name: "IX_ProjectBudgets_ProjectId1",
                table: "ProjectBudgets");

            migrationBuilder.DropColumn(
                name: "ProjectId1",
                table: "RiskProfiles");

            migrationBuilder.DropColumn(
                name: "ProjectId1",
                table: "ProjectBudgets");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ProjectId1",
                table: "RiskProfiles",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "ProjectId1",
                table: "ProjectBudgets",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_RiskProfiles_ProjectId1",
                table: "RiskProfiles",
                column: "ProjectId1");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectBudgets_ProjectId1",
                table: "ProjectBudgets",
                column: "ProjectId1");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectBudgets_Projects_ProjectId1",
                table: "ProjectBudgets",
                column: "ProjectId1",
                principalTable: "Projects",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RiskProfiles_Projects_ProjectId1",
                table: "RiskProfiles",
                column: "ProjectId1",
                principalTable: "Projects",
                principalColumn: "Id");
        }
    }
}
