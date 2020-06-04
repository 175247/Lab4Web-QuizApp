using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Lab4Web_QuizApp.Migrations
{
    public partial class ChangeDateTimetype : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "dbeb5451-7050-44a8-bf40-9ff540ea686d");

            migrationBuilder.AlterColumn<string>(
                name: "DateSubmitted",
                table: "HighScores",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "f7cc9f8b-d68e-4919-a744-987fa5b3573c", "6b025a92-866c-4952-b371-04906ba91841", "Administrator", "ADMINISTRATOR" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f7cc9f8b-d68e-4919-a744-987fa5b3573c");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateSubmitted",
                table: "HighScores",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "dbeb5451-7050-44a8-bf40-9ff540ea686d", "119eaa89-af30-4bc4-8522-b1368153fed6", "Administrator", "ADMINISTRATOR" });
        }
    }
}
