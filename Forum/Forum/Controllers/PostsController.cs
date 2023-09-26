using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Forum.Data;
using Forum.Models;
using Microsoft.AspNetCore.Authorization;

namespace Forum.Controllers
{
    public class PostsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public PostsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [Authorize(Roles = "Member")]
        public async Task<IActionResult> Member()
        {
            var posts = from p in _context.Post select p;
            posts = posts.OrderByDescending(p => p.PostedAt);
            return View(await posts.AsNoTracking().ToListAsync());
        }

        // GET: Posts
        [Authorize(Roles ="Admin")]
        public async Task<IActionResult> Admin()
        {
              return View(await _context.Post.ToListAsync());
        }

        // GET: Posts/Details/5
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

        // GET: Posts/Create
        public IActionResult Create()
        {
            return View();
        }


        [HttpPost]
        [Authorize(Roles = "Member")]
        public async Task<IActionResult> Display_Search(string data)
        {
            var posts = from p in _context.Post select p;
            posts = posts.Where(p => p.Topic == data);
            posts = posts.OrderByDescending(p => p.PostedAt);
            return View(await posts.AsNoTracking().ToListAsync());
        }

        [HttpPost]
        [Authorize(Roles = "Member")]
        public async Task<IActionResult> Display_Filter_Topic(string data1)
        {
            var posts = from p in _context.Post select p;
            posts = posts.Where(p => p.Topic == data1);
            posts = posts.OrderByDescending(p => p.PostedAt);
            return View(await posts.AsNoTracking().ToListAsync());
        }

        [HttpPost]
        [Authorize(Roles = "Member")]
        public async Task<IActionResult> Display_Filter_Member(string data2)
        {
            var posts = from p in _context.Post select p;
            posts = posts.Where(p => p.PostedBy == data2);
            posts = posts.OrderByDescending(p => p.PostedAt);
            return View(await posts.AsNoTracking().ToListAsync());
        }

        [HttpPost]
        [Authorize(Roles = "Member")]
        public async Task<IActionResult> Display_Filter_Date(DateTime data3)
        {
            var posts = from p in _context.Post select p;
            posts = posts.Where(p => p.PostedAt == data3);
            posts = posts.OrderByDescending(p => p.PostedAt);
            return View(await posts.AsNoTracking().ToListAsync());
        }


        [Authorize(Roles = "Member")]
        public IActionResult Search()
        {
            return View();
        }

        [Authorize(Roles = "Member")]
        public async Task<IActionResult> FilterPosts()
        {
            return View();
        }

        // POST: Posts/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Topic,Message,PostedBy,PostedAt")] Post post)
        {
            if (ModelState.IsValid)
            {
                _context.Add(post);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Member));
            }
            return View(post);
        }

        // GET: Posts/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Post == null)
            {
                return NotFound();
            }

            var post = await _context.Post.FindAsync(id);
            if (post == null)
            {
                return NotFound();
            }
            return View(post);
        }

        // POST: Posts/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Topic,Message,PostedBy,PostedAt")] Post post)
        {
            if (id != post.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(post);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!PostExists(post.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(post);
        }

        // GET: Posts/Delete/5
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

        // POST: Posts/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Post == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Post'  is null.");
            }
            var post = await _context.Post.FindAsync(id);
            if (post != null)
            {
                _context.Post.Remove(post);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool PostExists(int id)
        {
          return _context.Post.Any(e => e.Id == id);
        }
    }
}
