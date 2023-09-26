using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Forum.Data;
using Forum.Models;
using Microsoft.AspNetCore.Authorization;

namespace Forum.Controllers
{
    public class AdminController : Controller
    {
        private readonly ApplicationDbContext _context;

        public AdminController(ApplicationDbContext context)
        {
            _context = context;
        }

        [Authorize(Roles = "Admin")]
        public IActionResult Create()
        {
            return View();
        }

        [Authorize(Roles = "Admin")]
        public IActionResult Create_User()
        {
            return View();
        }



        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ListPosts()
        {
            var posts = from p in _context.Post select p;
            posts = posts.OrderByDescending(p => p.PostedAt);
            return View(await posts.AsNoTracking().ToListAsync());
        }

        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Post == null)
            {
                return NotFound();
            }

            var post = await _context.Post
                .FirstOrDefaultAsync(m => m.Id == id);
            if (post == null)
            {
                return NotFound();
            }

            return View(post);
        }

        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Post == null)
            {
                return NotFound();
            }

            var post = await _context.Post
                .FirstOrDefaultAsync(m => m.Id == id);
            if (post == null)
            {
                return NotFound();
            }

            return View(post);
        }


        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ListRoles()
        {
            List<IdentityRole> roles = await _context.Roles.ToListAsync();
            ViewData["userroles"] = roles;

            return View();
        }

        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ListUsers()
        {
            List<IdentityUser> users = await _context.Users.ToListAsync();
            ViewData["users"] = users;
            return View();
        }


    }
}
