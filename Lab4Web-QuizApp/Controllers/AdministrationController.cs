using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using IdentityModel;
using Lab4Web_QuizApp.Data;
using Lab4Web_QuizApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Lab4Web_QuizApp.Controllers
{
    public enum RoleCheckReturnTypes { IsAdmin, IsNotAdmin, BadRequest, Ok, InternalServerError }
    [Authorize(Roles = "Administrator")]
    [Route("administration")]
    [ApiController]
    public class AdministrationController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private RoleCheckReturnTypes roleCheckResult;

        public AdministrationController(ApplicationDbContext context,
            RoleManager<IdentityRole> roleManager,
            UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _roleManager = roleManager;
            _userManager = userManager;
        }

        //public bool CheckUserRole(string userId)
        //{
        //    if (userId == null)
        //    {
        //        roleCheckResult = RoleCheckReturnTypes.BadRequest;
        //    }
        //
        //    var currentUser =  _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
        //    var adminRoleUsers =  _userManager.GetUsersInRoleAsync("Administrator");
        //    List<ApplicationUser> users = adminRoleUsers;
        //
        //    foreach (var admins in adminRoleUsers)
        //    {
        //        if (admins.Id == currentUser.Id)
        //            return true;
        //    }
        //
        //    return false;
        //}

        [HttpPost]
        public async Task<IActionResult> CheckUserRole([FromBody] string userId)
        {
            if (userId == null)
            {
                return BadRequest();
            }

            var currentUser = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            var isUserAnAdmin = false;
            var adminRoleUsers = await _userManager.GetUsersInRoleAsync("Administrator");

            foreach (var admins in adminRoleUsers)
            {
                if (admins.Id == currentUser.Id)
                    isUserAnAdmin = true;
            }

            if (isUserAnAdmin)
            {
                return Ok(new
                {
                    success = true,
                    message = $"The user {currentUser.Email} is an admin"
                });
            }
            else
            {
                return NotFound(new
                {
                    success = false,
                    message = $"The user {currentUser.Email} is NOT an admin"
                });
            }

            //return StatusCode(StatusCodes.Status500InternalServerError, new
            //{
            //    success = false,
            //    description = "The database is currently unavailable"
            //});
        }

       //[HttpGet]
       //public Task<IActionResult> GetAll([FromBody] string userId)
       //{
       //
       //}

        // GET api/<AdministrationController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<AdministrationController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<AdministrationController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<AdministrationController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
