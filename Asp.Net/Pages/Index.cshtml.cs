using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Assignment2.Models;
using Assignment2.Services;

namespace Assignment2.Pages
{
    public class IndexModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;
        private readonly WebNamedColorService _flagService;
        public IEnumerable<WebNamedColor> WebNamedColors { get; private set; }

        public IndexModel(ILogger<IndexModel> logger,
            WebNamedColorService flagService)
        {
            _logger = logger;
            _flagService = flagService;
        }

        public void OnGet()
        {
            WebNamedColors = _flagService.GetWebNamedColor();
        }
    }
}
