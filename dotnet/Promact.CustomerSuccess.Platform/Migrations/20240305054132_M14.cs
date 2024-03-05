using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Promact.CustomerSuccess.Platform.Migrations
{
    /// <inheritdoc />
    public partial class M14 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Sprints_PhaseMilestones_PhaseMilestoneId",
                table: "Sprints");

            migrationBuilder.DropForeignKey(
                name: "FK_Sprints_Users_CreatorId",
                table: "Sprints");

            migrationBuilder.DropForeignKey(
                name: "FK_Sprints_Users_LastModifierId",
                table: "Sprints");

            migrationBuilder.DropIndex(
                name: "IX_Sprints_CreatorId",
                table: "Sprints");

            migrationBuilder.DropIndex(
                name: "IX_Sprints_LastModifierId",
                table: "Sprints");

            migrationBuilder.DropIndex(
                name: "IX_Sprints_PhaseMilestoneId",
                table: "Sprints");

            migrationBuilder.DropColumn(
                name: "ConcurrencyStamp",
                table: "Sprints");

            migrationBuilder.DropColumn(
                name: "ExtraProperties",
                table: "Sprints");

            migrationBuilder.DropColumn(
                name: "Goals",
                table: "Sprints");

            migrationBuilder.DropColumn(
                name: "PhaseMilestoneId",
                table: "Sprints");

            migrationBuilder.AlterColumn<string>(
                name: "Status",
                table: "Sprints",
                type: "text",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<string>(
                name: "ProjectId",
                table: "Sprints",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "Sprints");

            migrationBuilder.AlterColumn<int>(
                name: "Status",
                table: "Sprints",
                type: "integer",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<string>(
                name: "ConcurrencyStamp",
                table: "Sprints",
                type: "character varying(40)",
                maxLength: 40,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ExtraProperties",
                table: "Sprints",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Goals",
                table: "Sprints",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<Guid>(
                name: "PhaseMilestoneId",
                table: "Sprints",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Sprints_CreatorId",
                table: "Sprints",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_Sprints_LastModifierId",
                table: "Sprints",
                column: "LastModifierId");

            migrationBuilder.CreateIndex(
                name: "IX_Sprints_PhaseMilestoneId",
                table: "Sprints",
                column: "PhaseMilestoneId");

            migrationBuilder.AddForeignKey(
                name: "FK_Sprints_PhaseMilestones_PhaseMilestoneId",
                table: "Sprints",
                column: "PhaseMilestoneId",
                principalTable: "PhaseMilestones",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Sprints_Users_CreatorId",
                table: "Sprints",
                column: "CreatorId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Sprints_Users_LastModifierId",
                table: "Sprints",
                column: "LastModifierId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
