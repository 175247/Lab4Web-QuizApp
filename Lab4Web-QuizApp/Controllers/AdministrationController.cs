using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Linq;
using System.Net;
using System.Security.Claims;
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
    [Route("administration")]
    [ApiController]
    public class AdministrationController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<ApplicationUser> _userManager;

        public AdministrationController(ApplicationDbContext context,
            RoleManager<IdentityRole> roleManager,
            UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _roleManager = roleManager;
            _userManager = userManager;
        }

        private async Task<bool> CheckUserRole()
        {
            var claimsIdentity = (ClaimsIdentity)User.Identity;
            var claim = claimsIdentity.FindFirst(ClaimTypes.NameIdentifier);
            var user = _context.Users.Find(claim.Value);

            var roles = await _userManager.GetRolesAsync(user);

            if (roles.Contains("Administrator"))
                return true;

            return false;
        }

        [HttpGet]
        public async Task<IActionResult> HandleAdminAuthorization()
        {
            if (User == null)
            {
                return BadRequest();
            }

            if (CheckUserRole().Result == false)
            {
                return Unauthorized();
            }

            // Else do things below. Do the above CheckUserRole().Result check for each action.

            return Ok();
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
