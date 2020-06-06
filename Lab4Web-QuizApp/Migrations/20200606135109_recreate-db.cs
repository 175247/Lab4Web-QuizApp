using Microsoft.EntityFrameworkCore.Migrations;

namespace Lab4Web_QuizApp.Migrations
{
    public partial class recreatedb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "24f3c6b5-ba28-4bd9-8103-3c42c8f12f89");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "0c087117-4b02-40e7-a1aa-2c719e4b423e", "451b7184-3380-442f-85f3-4ca858761b2f", "Administrator", "ADMINISTRATOR" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0c087117-4b02-40e7-a1aa-2c719e4b423e");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "24f3c6b5-ba28-4bd9-8103-3c42c8f12f89", "f459ba67-0919-465c-85eb-750f990045ee", "Administrator", "ADMINISTRATOR" });
        }
    }
}
