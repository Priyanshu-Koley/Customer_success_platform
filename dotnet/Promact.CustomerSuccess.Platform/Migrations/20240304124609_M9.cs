using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Promact.CustomerSuccess.Platform.Migrations
{
    /// <inheritdoc />
    public partial class M9 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectBudgets_Users_CreatorId",
                table: "ProjectBudgets");

            migrationBuilder.DropForeignKey(
                name: "FK_ProjectBudgets_Users_LastModifierId",
                table: "ProjectBudgets");

            migrationBuilder.DropIndex(
                name: "IX_ProjectBudgets_CreatorId",
                table: "ProjectBudgets");

            migrationBuilder.DropIndex(
                name: "IX_ProjectBudgets_LastModifierId",
                table: "ProjectBudgets");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_ProjectBudgets_CreatorId",
                table: "ProjectBudgets",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectBudgets_LastModifierId",
                table: "ProjectBudgets",
                column: "LastModifierId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectBudgets_Users_CreatorId",
                table: "ProjectBudgets",
                column: "CreatorId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectBudgets_Users_LastModifierId",
                table: "ProjectBudgets",
                column: "LastModifierId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
