using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Lab4Web_QuizApp.Data;
using Lab4Web_QuizApp.Models;

namespace Lab4Web_QuizApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HighScoresController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public HighScoresController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/HighScores
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HighScore>>> GetHighScore()
        {
            return await _context.HighScores.ToListAsync();
        }

        // GET: api/HighScores/5
        [HttpGet("{id}")]
        public async Task<ActionResult<HighScore>> GetHighScore(int id)
        {
            var highScore = await _context.HighScores.FindAsync(id);

            if (highScore == null)
            {
                return NotFound();
            }

            return highScore;
        }


    
        [HttpPost]
        public async Task<ActionResult<HighScore>> PostHighScore(HighScore highScore)
        {
            _context.HighScores.Add(highScore);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHighScore", new { id = highScore.Id }, highScore);
        }
/*
        // DELETE: api/HighScores/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<HighScore>> DeleteHighScore(int id)
        {
            var highScore = await _context.HighScore.FindAsync(id);
            if (highScore == null)
            {
                return NotFound();
            }

            _context.HighScore.Remove(highScore);
            await _context.SaveChangesAsync();

            return highScore;
        }

        private bool HighScoreExists(int id)
        {
            return _context.HighScore.Any(e => e.Id == id);
        }
*/
    }
}
