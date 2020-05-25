using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Lab4Web_QuizApp.Data;
using Lab4Web_QuizApp.Models;
using Lab4Web_QuizApp.Models.HTTP;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;

namespace Lab4Web_QuizApp.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public QuestionsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("/questions")]
        public async Task<IActionResult> Get()
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

                    var response = Enumerable.Range(0, questions.Count())
                        .Select(index => new QuestionResponse
                    {
                        RequestTime = DateTime.Now,
                        Id = questions[index].Id,
                        QuestionString = questions[index].QuestionString,
                        AnswerOptions = questions[index].AnswerOptions
                    })
                    .ToArray();

                    return Ok(response);
                }
                catch (Exception exception)
                {
                    return BadRequest(exception);
                }
            }
            else // Leaving this "else" here for clarity and readability.
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new
                {
                    message = "The database is currently unavailable."
                });
            }

        }
    }
}
