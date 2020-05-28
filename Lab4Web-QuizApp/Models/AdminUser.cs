using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Lab4Web_QuizApp.Models
{
    public class AdminUser : ApplicationUser
    {
        public string Password { get; set; }
    }
}
