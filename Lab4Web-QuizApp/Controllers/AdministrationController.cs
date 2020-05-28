//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Net;
//using System.Threading.Tasks;
//using IdentityModel;
//using Microsoft.AspNetCore.Identity;
//using Microsoft.AspNetCore.Mvc;

//namespace Lab4Web_QuizApp.Controllers
//{
//    [Route("admin")]
//    [ApiController]
//    public class AdministrationController : ControllerBase
//    {
//        private readonly RoleManager<IdentityRole> _roleManager;

//        public AdministrationController(RoleManager<IdentityRole> roleManager)
//        {
//            _roleManager = roleManager;
//        }

//        public async Task<IActionResult> HandleRole()
//        {
//            string role = "administrator";
//            var isRoleExisting = await _roleManager.RoleExistsAsync(role);

//            if (isRoleExisting)
//            {
//                return Ok(new { success = true, description = $"The role \"{role}\" already exists." });
//            }

//            var result = await _roleManager.CreateAsync()
//        }

//        [HttpGet]
//        public IActionResult CreateRole()
//        {
//            return new string[] { "value1", "value2" };
//        }

//        // GET api/<AdministrationController>/5
//        [HttpGet("{id}")]
//        public string Get(int id)
//        {
//            return "value";
//        }

//        // POST api/<AdministrationController>
//        [HttpPost]
//        public void Post([FromBody] string value)
//        {
//        }

//        // PUT api/<AdministrationController>/5
//        [HttpPut("{id}")]
//        public void Put(int id, [FromBody] string value)
//        {
//        }

//        // DELETE api/<AdministrationController>/5
//        [HttpDelete("{id}")]
//        public void Delete(int id)
//        {
//        }
//    }
//}
