using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Promact.CustomerSuccess.Platform.Migrations
{
    /// <inheritdoc />
    public partial class M6 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectBudgets_Projects_ProjectId",
                table: "ProjectBudgets");

            migrationBuilder.DropIndex(
                name: "IX_ProjectBudgets_ProjectId",
                table: "ProjectBudgets");

            migrationBuilder.DropPrimaryKey(
                name: "PK_VersionHistories",
                table: "VersionHistories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AuditHistories",
                table: "AuditHistories");

            migrationBuilder.RenameTable(
                name: "VersionHistories",
                newName: "VersionHistory");

            migrationBuilder.RenameTable(
                name: "AuditHistories",
                newName: "AuditHistory");

            migrationBuilder.AlterColumn<string>(
                name: "ProjectId",
                table: "ProjectBudgets",
                type: "text",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AlterColumn<string>(
                name: "Currency",
                table: "ProjectBudgets",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<double>(
                name: "BudgetedCost",
                table: "ProjectBudgets",
                type: "double precision",
                nullable: true,
                oldClrType: typeof(double),
                oldType: "double precision");

            migrationBuilder.AddColumn<Guid>(
                name: "ProjectId1",
                table: "ProjectBudgets",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_VersionHistory",
                table: "VersionHistory",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AuditHistory",
                table: "AuditHistory",
                column: "Id");

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
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectBudgets_Projects_ProjectId1",
                table: "ProjectBudgets");

            migrationBuilder.DropIndex(
                name: "IX_ProjectBudgets_ProjectId1",
                table: "ProjectBudgets");

            migrationBuilder.DropPrimaryKey(
                name: "PK_VersionHistory",
                table: "VersionHistory");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AuditHistory",
                table: "AuditHistory");

            migrationBuilder.DropColumn(
                name: "ProjectId1",
                table: "ProjectBudgets");

            migrationBuilder.RenameTable(
                name: "VersionHistory",
                newName: "VersionHistories");

            migrationBuilder.RenameTable(
                name: "AuditHistory",
                newName: "AuditHistories");

            migrationBuilder.AlterColumn<Guid>(
                name: "ProjectId",
                table: "ProjectBudgets",
                type: "uuid",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Currency",
                table: "ProjectBudgets",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<double>(
                name: "BudgetedCost",
                table: "ProjectBudgets",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0,
                oldClrType: typeof(double),
                oldType: "double precision",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_VersionHistories",
                table: "VersionHistories",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AuditHistories",
                table: "AuditHistories",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectBudgets_ProjectId",
                table: "ProjectBudgets",
                column: "ProjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectBudgets_Projects_ProjectId",
                table: "ProjectBudgets",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
