using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Promact.CustomerSuccess.Platform.Migrations
{
    /// <inheritdoc />
    public partial class M11 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RiskProfiles_Projects_ProjectId",
                table: "RiskProfiles");

            migrationBuilder.DropForeignKey(
                name: "FK_RiskProfiles_Users_CreatorId",
                table: "RiskProfiles");

            migrationBuilder.DropForeignKey(
                name: "FK_RiskProfiles_Users_LastModifierId",
                table: "RiskProfiles");

            migrationBuilder.DropTable(
                name: "RemediationStep");

            migrationBuilder.DropIndex(
                name: "IX_RiskProfiles_CreatorId",
                table: "RiskProfiles");

            migrationBuilder.DropIndex(
                name: "IX_RiskProfiles_LastModifierId",
                table: "RiskProfiles");

            migrationBuilder.DropIndex(
                name: "IX_RiskProfiles_ProjectId",
                table: "RiskProfiles");

            migrationBuilder.DropColumn(
                name: "ConcurrencyStamp",
                table: "RiskProfiles");

            migrationBuilder.RenameColumn(
                name: "ExtraProperties",
                table: "RiskProfiles",
                newName: "Status");

            migrationBuilder.AlterColumn<string>(
                name: "Severity",
                table: "RiskProfiles",
                type: "text",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<string>(
                name: "RiskType",
                table: "RiskProfiles",
                type: "text",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<string>(
                name: "ProjectId",
                table: "RiskProfiles",
                type: "text",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AlterColumn<string>(
                name: "Impact",
                table: "RiskProfiles",
                type: "text",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<string>(
                name: "ClosureDate",
                table: "RiskProfiles",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "RiskProfiles",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<Guid>(
                name: "ProjectId1",
                table: "RiskProfiles",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RemediationSteps",
                table: "RiskProfiles",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "Stakeholders",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Contact = table.Column<string>(type: "text", nullable: false),
                    ProjectId = table.Column<string>(type: "text", nullable: false),
                    CreationTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    CreatorId = table.Column<Guid>(type: "uuid", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    LastModifierId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stakeholders", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RiskProfiles_ProjectId1",
                table: "RiskProfiles",
                column: "ProjectId1");

            migrationBuilder.AddForeignKey(
                name: "FK_RiskProfiles_Projects_ProjectId1",
                table: "RiskProfiles",
                column: "ProjectId1",
                principalTable: "Projects",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RiskProfiles_Projects_ProjectId1",
                table: "RiskProfiles");

            migrationBuilder.DropTable(
                name: "Stakeholders");

            migrationBuilder.DropIndex(
                name: "IX_RiskProfiles_ProjectId1",
                table: "RiskProfiles");

            migrationBuilder.DropColumn(
                name: "ClosureDate",
                table: "RiskProfiles");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "RiskProfiles");

            migrationBuilder.DropColumn(
                name: "ProjectId1",
                table: "RiskProfiles");

            migrationBuilder.DropColumn(
                name: "RemediationSteps",
                table: "RiskProfiles");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "RiskProfiles",
                newName: "ExtraProperties");

            migrationBuilder.AlterColumn<int>(
                name: "Severity",
                table: "RiskProfiles",
                type: "integer",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<int>(
                name: "RiskType",
                table: "RiskProfiles",
                type: "integer",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<Guid>(
                name: "ProjectId",
                table: "RiskProfiles",
                type: "uuid",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<int>(
                name: "Impact",
                table: "RiskProfiles",
                type: "integer",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<string>(
                name: "ConcurrencyStamp",
                table: "RiskProfiles",
                type: "character varying(40)",
                maxLength: 40,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "RemediationStep",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatorId = table.Column<Guid>(type: "uuid", nullable: true),
                    LastModifierId = table.Column<Guid>(type: "uuid", nullable: true),
                    RiskProfileId = table.Column<Guid>(type: "uuid", nullable: false),
                    ConcurrencyStamp = table.Column<string>(type: "character varying(40)", maxLength: 40, nullable: false),
                    CreationTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    ExtraProperties = table.Column<string>(type: "text", nullable: false),
                    LastModificationTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RemediationStep", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RemediationStep_RiskProfiles_RiskProfileId",
                        column: x => x.RiskProfileId,
                        principalTable: "RiskProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RemediationStep_Users_CreatorId",
                        column: x => x.CreatorId,
                        principalTable: "Users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_RemediationStep_Users_LastModifierId",
                        column: x => x.LastModifierId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_RiskProfiles_CreatorId",
                table: "RiskProfiles",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_RiskProfiles_LastModifierId",
                table: "RiskProfiles",
                column: "LastModifierId");

            migrationBuilder.CreateIndex(
                name: "IX_RiskProfiles_ProjectId",
                table: "RiskProfiles",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_RemediationStep_CreatorId",
                table: "RemediationStep",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_RemediationStep_LastModifierId",
                table: "RemediationStep",
                column: "LastModifierId");

            migrationBuilder.CreateIndex(
                name: "IX_RemediationStep_RiskProfileId",
                table: "RemediationStep",
                column: "RiskProfileId");

            migrationBuilder.AddForeignKey(
                name: "FK_RiskProfiles_Projects_ProjectId",
                table: "RiskProfiles",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RiskProfiles_Users_CreatorId",
                table: "RiskProfiles",
                column: "CreatorId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RiskProfiles_Users_LastModifierId",
                table: "RiskProfiles",
                column: "LastModifierId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
