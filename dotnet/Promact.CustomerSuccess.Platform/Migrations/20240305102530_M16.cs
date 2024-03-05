using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Promact.CustomerSuccess.Platform.Migrations
{
    /// <inheritdoc />
    public partial class M16 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Pupose",
                table: "Projects",
                newName: "TotalBudget");

            migrationBuilder.RenameColumn(
                name: "Budget",
                table: "Projects",
                newName: "Purpose");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TotalBudget",
                table: "Projects",
                newName: "Pupose");

            migrationBuilder.RenameColumn(
                name: "Purpose",
                table: "Projects",
                newName: "Budget");
        }
    }
}
