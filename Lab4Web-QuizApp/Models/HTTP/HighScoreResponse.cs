using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Lab4Web_QuizApp.Models
{
    public class HighScoreResponse
    {
        public int Id { get; set; }
        public int Score { get; set; }
        public string DateSubmitted { get; set; }
        public string Username { get; set; }
    }
}
