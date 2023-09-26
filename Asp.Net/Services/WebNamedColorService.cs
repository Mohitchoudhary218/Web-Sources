using System.Text.Json;
using Assignment2.Models;

namespace Assignment2.Services
{
    public class WebNamedColorService
    {
        public WebNamedColorService(IWebHostEnvironment webHostEnvironment)
        {
            WebHostEnvironment = webHostEnvironment;
        }

        public IWebHostEnvironment WebHostEnvironment { get; }

        private string JsonFileName => Path.Combine(WebHostEnvironment.WebRootPath, "..", "Models", "data", "web-named-color.json");

        public IEnumerable<Models.WebNamedColor> GetWebNamedColor()
        {
            using var jsonFileReader = File.OpenText(JsonFileName);
            return JsonSerializer.Deserialize<WebNamedColor[]>(jsonFileReader.ReadToEnd(), new JsonSerializerOptions{PropertyNameCaseInsensitive = true});
        }
    }
}

