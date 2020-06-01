using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Lab4Web_QuizApp.Data;
using Lab4Web_QuizApp.Models;
using Lab4Web_QuizApp.Models.HTTP;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.VisualStudio.Web.CodeGeneration.Contracts.Messaging;

namespace Lab4Web_QuizApp.Controllers
{
    [Authorize(Roles="Administrator")]
    [Route("questions")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public QuestionsController(ApplicationDbContext context)
        {
            _context = context;
        }

        public QuestionResponse[] GenerateQuestionResponse(List<Question> question)
        {
            var response = Enumerable.Range(0, question.Count())
                        .Select(index => new QuestionResponse
                        {
                            RequestTime = DateTime.Now,
                            Id = question[index].Id,
                            QuestionString = question[index].QuestionString,
                            AnswerOptions = question[index].AnswerOptions
                        })
                    .ToArray();

            return response;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            if (_context.Database.CanConnect())
            {
                try
                {
                    var questions = await _context.Questions.Include(a => a.AnswerOptions).ToListAsync();

                    if (questions.Count() == 0 || questions == null)
                    {
                        return NoContent();
                    }

                    var response = GenerateQuestionResponse(questions);
                    //var response = Enumerable.Range(0, questions.Count())
                    //    .Select(index => new QuestionResponse
                    //    {
                    //        RequestTime = DateTime.Now,
                    //        Id = questions[index].Id,
                    //        QuestionString = questions[index].QuestionString,
                    //        AnswerOptions = questions[index].AnswerOptions
                    //    })
                    //.ToArray();

                    return Ok(response);
                }
                catch (Exception exception)
                {
                    return BadRequest(exception);
                }
            }
            else // Leaving this "else" here for clarity and readability.
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable, new
                {
                    message = "The database is currently unavailable."
                });
            }
        }

        [Authorize(Roles="Administrator")]
        [HttpPost]
        public async Task<IActionResult> SubmitNewQuestion([FromBody] QuestionRequest request)
        {
            if (request == null)
            {
                return BadRequest(new { success = false, message = "Body cannot contain null" });
            }

            var answers = new List<Answer>();
            foreach (var answer in request.AnswerOptions)
            {
                answers.Add(answer);
            }

            var question = new Question
            {
                QuestionString = request.QuestionString,
                AnswerOptions = answers
            };
             
            try
            {
                await _context.Questions.AddAsync(question);
                await _context.SaveChangesAsync();

                int newQuestionId = question.Id;
                var questions = new List<Question>() {
                    question
                };

                var response = GenerateQuestionResponse(questions);

                return Ok(response);
            }
            catch (Exception exception)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable, new
                {
                    message = "The database is currently unavailable.",
                    Description = exception.InnerException
                });
            }
        }

    }
}
