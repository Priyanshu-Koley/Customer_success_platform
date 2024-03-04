using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Promact.CustomerSuccess.Platform.Migrations
{
    /// <inheritdoc />
    public partial class M3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AuditHistories_Projects_ProjectId",
                table: "AuditHistories");

            migrationBuilder.DropIndex(
                name: "IX_AuditHistories_ProjectId",
                table: "AuditHistories");

            migrationBuilder.RenameColumn(
                name: "status",
                table: "AuditHistories",
                newName: "Status");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Status",
                table: "AuditHistories",
                newName: "status");

            migrationBuilder.CreateIndex(
                name: "IX_AuditHistories_ProjectId",
                table: "AuditHistories",
                column: "ProjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_AuditHistories_Projects_ProjectId",
                table: "AuditHistories",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
