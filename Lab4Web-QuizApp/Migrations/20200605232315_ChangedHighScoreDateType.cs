using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Lab4Web_QuizApp.Migrations
{
    public partial class ChangedHighScoreDateType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6ebe2fae-666e-4cd6-982f-714b217d74e7");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateSubmitted",
                table: "HighScores",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "24f3c6b5-ba28-4bd9-8103-3c42c8f12f89", "f459ba67-0919-465c-85eb-750f990045ee", "Administrator", "ADMINISTRATOR" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "24f3c6b5-ba28-4bd9-8103-3c42c8f12f89");

            migrationBuilder.AlterColumn<string>(
                name: "DateSubmitted",
                table: "HighScores",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(DateTime));

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "6ebe2fae-666e-4cd6-982f-714b217d74e7", "04705cb5-7b76-4d25-9abd-d139cea3b86f", "Administrator", "ADMINISTRATOR" });
        }
    }
}
