using Microsoft.EntityFrameworkCore.Migrations;

namespace Lab4Web_QuizApp.Migrations
{
    public partial class AddUsernameToHighscore : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Username",
                table: "HighScores",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Username",
                table: "HighScores");
        }
    }
}
