using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Promact.CustomerSuccess.Platform.Migrations
{
    /// <inheritdoc />
    public partial class RemovedPhaseMilestoneIdInSprint : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Sprints_PhaseMilestones_PhaseMilestoneId",
                table: "Sprints");

            migrationBuilder.DropIndex(
                name: "IX_Sprints_PhaseMilestoneId",
                table: "Sprints");

            migrationBuilder.DropColumn(
                name: "PhaseMilestoneId",
                table: "Sprints");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "PhaseMilestoneId",
                table: "Sprints",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Sprints_PhaseMilestoneId",
                table: "Sprints",
                column: "PhaseMilestoneId");

            migrationBuilder.AddForeignKey(
                name: "FK_Sprints_PhaseMilestones_PhaseMilestoneId",
                table: "Sprints",
                column: "PhaseMilestoneId",
                principalTable: "PhaseMilestones",
                principalColumn: "Id");
        }
    }
}
