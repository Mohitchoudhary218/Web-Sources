using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;


namespace Forum.Models
{
    public class Post
    {
        public int Id { get; set; }
        public string Topic { get; set; }
        public string Message { get; set; }
        public string PostedBy { get; set; }
        public DateTime PostedAt { get; set; } = DateTime.UtcNow;
    }
}
