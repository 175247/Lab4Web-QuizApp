using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Lab4Web_QuizApp.Data;
using Lab4Web_QuizApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.Web.CodeGeneration.Contracts.Messaging;

namespace Lab4Web_QuizApp.Controllers
{
    [Route("database")]
    [ApiController]
    public class Database : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public Database(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPut]
        public async Task<IActionResult> SeedDatabase()
        {
            await _context.Database.MigrateAsync();
            var questionBank = await _context.Questions.Include(a => a.AnswerOptions).ToListAsync();

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
            if (questionBank.Count() > 0 && questionBank.Count() <= questions.Count())
            {
                return StatusCode(StatusCodes.Status208AlreadyReported, new
                {
                    success = true,
                    description = "The database is already seeded."
                });
            }
            else
            {
                try
                {
                    await _context.Questions.AddRangeAsync(questions);
                    await _context.SaveChangesAsync();

                    return Ok(new 
                    {
                        success = true,
                        description = "Seed complete"
                    });
                }
                catch (Exception exception)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, new
                    {
                        success = false,
                        message = "The database is currently unavailable.",
                        description = exception.InnerException
                    });
                }
            }
        }
    }
}
