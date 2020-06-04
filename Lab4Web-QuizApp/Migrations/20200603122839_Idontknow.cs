using Microsoft.EntityFrameworkCore.Migrations;

namespace Lab4Web_QuizApp.Migrations
{
    public partial class Idontknow : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5effe2e4-6f0d-4b18-82e2-9aa119a66dcb");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "a3b52a63-b263-4360-84c3-484db33c4a55", "829971ce-3610-42f0-b8f4-ca8b9b402084", "Administrator", "ADMINISTRATOR" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a3b52a63-b263-4360-84c3-484db33c4a55");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "5effe2e4-6f0d-4b18-82e2-9aa119a66dcb", "c3661669-5586-4406-8d86-967136fedfba", "Administrator", "ADMINISTRATOR" });
        }
    }
}
