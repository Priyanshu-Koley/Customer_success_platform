using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Promact.CustomerSuccess.Platform.Migrations
{
    /// <inheritdoc />
    public partial class M13 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PhaseMilestones_Projects_ProjectId",
                table: "PhaseMilestones");

            migrationBuilder.DropForeignKey(
                name: "FK_PhaseMilestones_Users_CreatorId",
                table: "PhaseMilestones");

            migrationBuilder.DropForeignKey(
                name: "FK_PhaseMilestones_Users_LastModifierId",
                table: "PhaseMilestones");

            migrationBuilder.DropIndex(
                name: "IX_PhaseMilestones_CreatorId",
                table: "PhaseMilestones");

            migrationBuilder.DropIndex(
                name: "IX_PhaseMilestones_LastModifierId",
                table: "PhaseMilestones");

            migrationBuilder.DropIndex(
                name: "IX_PhaseMilestones_ProjectId",
                table: "PhaseMilestones");

            migrationBuilder.DropColumn(
                name: "ConcurrencyStamp",
                table: "PhaseMilestones");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "PhaseMilestones");

            migrationBuilder.DropColumn(
                name: "ExtraProperties",
                table: "PhaseMilestones");

            migrationBuilder.AlterColumn<string>(
                name: "Status",
                table: "PhaseMilestones",
                type: "text",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<string>(
                name: "ProjectId",
                table: "PhaseMilestones",
                type: "text",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AddColumn<DateTime>(
                name: "ApprovalDate",
                table: "PhaseMilestones",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "RevisedCompletionDate",
                table: "PhaseMilestones",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ApprovalDate",
                table: "PhaseMilestones");

            migrationBuilder.DropColumn(
                name: "RevisedCompletionDate",
                table: "PhaseMilestones");

            migrationBuilder.AlterColumn<int>(
                name: "Status",
                table: "PhaseMilestones",
                type: "integer",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<Guid>(
                name: "ProjectId",
                table: "PhaseMilestones",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ConcurrencyStamp",
                table: "PhaseMilestones",
                type: "character varying(40)",
                maxLength: 40,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "PhaseMilestones",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ExtraProperties",
                table: "PhaseMilestones",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_PhaseMilestones_CreatorId",
                table: "PhaseMilestones",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_PhaseMilestones_LastModifierId",
                table: "PhaseMilestones",
                column: "LastModifierId");

            migrationBuilder.CreateIndex(
                name: "IX_PhaseMilestones_ProjectId",
                table: "PhaseMilestones",
                column: "ProjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_PhaseMilestones_Projects_ProjectId",
                table: "PhaseMilestones",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PhaseMilestones_Users_CreatorId",
                table: "PhaseMilestones",
                column: "CreatorId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PhaseMilestones_Users_LastModifierId",
                table: "PhaseMilestones",
                column: "LastModifierId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
