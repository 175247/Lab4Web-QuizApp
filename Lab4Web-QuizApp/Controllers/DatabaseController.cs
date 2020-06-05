using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using Lab4Web_QuizApp.Data;
using Lab4Web_QuizApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.Web.CodeGeneration.Contracts.Messaging;

namespace Lab4Web_QuizApp.Controllers
{
    [Authorize]
    [Route("database")]
    [ApiController]
    public class DatabaseController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<ApplicationUser> _userManager;

        public DatabaseController(ApplicationDbContext context,
            RoleManager<IdentityRole> roleManager,
            UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _roleManager = roleManager;
            _userManager = userManager;
        }

        [HttpPost]
        public async Task<IActionResult> CheckUserRole()
        {
            if (User.Identity == null)
            {
                return BadRequest();
            }
        
            try
            {
        
                var claimsIdentity = (ClaimsIdentity)User.Identity;
                var claim = claimsIdentity.FindFirst(ClaimTypes.NameIdentifier);
                var user = _context.Users.Find(claim.Value);
        
                var roles = await _userManager.GetRolesAsync(user);
        
                if (roles.Contains("Administrator"))
                {
                    return Ok(new
                    {
                        success = true
                    });
                }
        
                return Unauthorized(new
                {
                    success = "false"
                });
            }
            catch (Exception exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new
                {
                    success = false,
                    description = exception.InnerException
                });
            }
        }

        //[HttpPost]
        //public async Task<IActionResult> SeedAdmin()
        //{
        //    // Workaround-
        //    //if (User.IsInRole("Administrator"))
        //    //{
        //    //    
        //    //}
        //
        //    string roleName = "Administrator";
        //    var isRoleExists = await _roleManager.RoleExistsAsync(roleName);
        //
        //    if (!isRoleExists)
        //    {
        //        await _roleManager.CreateAsync(new IdentityRole(roleName));
        //    }
        //
        //    var adminUser = new ApplicationUser
        //    {
        //        UserName = "admin@admin.com",
        //        Email = "admin@admin.com",
        //        EmailConfirmed = true
        //    };
        //    var password = "Admin1½";
        //
        //    var actionResult = await _userManager.CreateAsync(adminUser, password);
        //
        //    if (actionResult.Succeeded)
        //    {
        //        await _userManager.AddToRoleAsync(adminUser, roleName);
        //
        //        return Ok(new
        //        {
        //            success = true,
        //            description = "Admin user added."
        //        });
        //    }
        //
        //    return StatusCode(StatusCodes.Status500InternalServerError, new
        //    {
        //        success = false,
        //        description = actionResult.Errors
        //    });
        //
        //}

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
                        },
                        new Answer
                        {
                            AnswerString = "Simon",
                            IsCorrectAnswer = false
                        }
                    }
                }
            };
            if (questionBank.Count() > 0 && questionBank.Count() <= questions.Count())
            {
                return Ok(new
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
                    return StatusCode(StatusCodes.Status503ServiceUnavailable, new
                    {
                        success = false,
                        description = exception.InnerException
                    });
                }
            }
        }
    }
}
