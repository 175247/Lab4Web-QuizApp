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
    [Authorize]
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
        public async Task<IActionResult> Get()
        {
            var question = "How ya doin";
            return Ok(question);
            //var questions = await _context.Questions.Include(a => a.AnswerOptions).ToListAsync();
            //var response = Enumerable.Range(1, questions.Count())
            //            .Select(currentIndex => new QuestionResponse
            //            {
            //                RequestTime = DateTime.Now,
            //                Id = questions[currentIndex].Id,
            //                QuestionString = questions[currentIndex].QuestionString,
            //                AnswerOptions = questions[currentIndex].AnswerOptions
            //            });
            //
            //        return Ok(response);
            //if (_context.Database.CanConnect())
            //{
            //
            //    try
            //    {
            //        var questions = await _context.Questions.Include(a => a.AnswerOptions).ToListAsync();
            //
            //        if (questions.Count() == 0 || questions == null)
            //        {
            //            return NoContent();
            //        }
            //
            //        var response = Enumerable.Range(1, questions.Count())
            //            .Select(currentIndex => new QuestionResponse
            //            {
            //                RequestTime = DateTime.Now,
            //                Id = questions[currentIndex].Id,
            //                QuestionString = questions[currentIndex].QuestionString,
            //                AnswerOptions = questions[currentIndex].AnswerOptions
            //            });
            //
            //        return Ok(response);
            //    }
            //    catch (Exception exception)
            //    {
            //        return BadRequest(exception);
            //    }
            //}
            //
            //return StatusCode(StatusCodes.Status500InternalServerError, new
            //{
            //    message = "The database is currently unavailable."
            //});

        }
    }
}
