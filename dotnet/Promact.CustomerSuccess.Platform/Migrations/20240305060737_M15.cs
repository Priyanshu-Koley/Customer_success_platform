using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Promact.CustomerSuccess.Platform.Migrations
{
    /// <inheritdoc />
    public partial class M15 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EscalationMatrices_Projects_ProjectId",
                table: "EscalationMatrices");

            migrationBuilder.DropForeignKey(
                name: "FK_EscalationMatrices_Users_CreatorId",
                table: "EscalationMatrices");

            migrationBuilder.DropForeignKey(
                name: "FK_EscalationMatrices_Users_LastModifierId",
                table: "EscalationMatrices");

            migrationBuilder.DropIndex(
                name: "IX_EscalationMatrices_CreatorId",
                table: "EscalationMatrices");

            migrationBuilder.DropIndex(
                name: "IX_EscalationMatrices_LastModifierId",
                table: "EscalationMatrices");

            migrationBuilder.DropIndex(
                name: "IX_EscalationMatrices_ProjectId",
                table: "EscalationMatrices");

            migrationBuilder.DropColumn(
                name: "ConcurrencyStamp",
                table: "EscalationMatrices");

            migrationBuilder.RenameColumn(
                name: "ExtraProperties",
                table: "EscalationMatrices",
                newName: "Responsible");

            migrationBuilder.AlterColumn<string>(
                name: "ProjectId",
                table: "EscalationMatrices",
                type: "text",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AlterColumn<string>(
                name: "Level",
                table: "EscalationMatrices",
                type: "text",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<string>(
                name: "EscalationType",
                table: "EscalationMatrices",
                type: "text",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Responsible",
                table: "EscalationMatrices",
                newName: "ExtraProperties");

            migrationBuilder.AlterColumn<Guid>(
                name: "ProjectId",
                table: "EscalationMatrices",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Level",
                table: "EscalationMatrices",
                type: "integer",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<int>(
                name: "EscalationType",
                table: "EscalationMatrices",
                type: "integer",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<string>(
                name: "ConcurrencyStamp",
                table: "EscalationMatrices",
                type: "character varying(40)",
                maxLength: 40,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_EscalationMatrices_CreatorId",
                table: "EscalationMatrices",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_EscalationMatrices_LastModifierId",
                table: "EscalationMatrices",
                column: "LastModifierId");

            migrationBuilder.CreateIndex(
                name: "IX_EscalationMatrices_ProjectId",
                table: "EscalationMatrices",
                column: "ProjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_EscalationMatrices_Projects_ProjectId",
                table: "EscalationMatrices",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EscalationMatrices_Users_CreatorId",
                table: "EscalationMatrices",
                column: "CreatorId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_EscalationMatrices_Users_LastModifierId",
                table: "EscalationMatrices",
                column: "LastModifierId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
