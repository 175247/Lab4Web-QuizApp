using Lab4Web_QuizApp.Data;
using Lab4Web_QuizApp.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Lab4Web_QuizApp
{
    internal class DbInitializer
    {
        private readonly ApplicationDbContext _context;

        public DbInitializer(ApplicationDbContext context)
        {
            _context = context;
        }

        public DbInitializer()
        {

        }

        public void SeedDatabase()
        {
            _context.Database.MigrateAsync();

            var questions = new List<Question>
            {
                new Question
                {
                    QuestionString = "What's the capital of Sweden?",
                    AnswerOptions = new List<Answer>
                    {
                        new Answer
                        {
                            AnswerString = "Gothenburg",
                            IsCorrectAnswer = true
                        },
                        new Answer
                        {
                            AnswerString = "Stockholm",
                            IsCorrectAnswer = false
                        },
                        new Answer
                        {
                            AnswerString = "Uppsala",
                            IsCorrectAnswer = false
                        }
                    }
                },
                new Question
                {
                    QuestionString = "Who's The Who's singer?",
                    AnswerOptions = new List<Answer>
                    {
                        new Answer
                        {
                            AnswerString = "Roger something...",
                            IsCorrectAnswer = true
                        },
                        new Answer
                        {
                            AnswerString = "...the other one?",
                            IsCorrectAnswer = false
                        }
                    }
                }
            };
            _context.Questions.AddRangeAsync(questions);
            _context.SaveChangesAsync();
        }
    }
}