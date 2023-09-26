using Assignment2.Services;
using System.Text.Json.Serialization;
using System.Text.Json;
namespace Assignment2.Models
{
    public class WebNamedColor
    {
        [JsonPropertyName("Code")]
        public string? Color_Hexadecimal_code {get; set;}
        [JsonPropertyName("Name")]
        public string? Color_Name {get; set;}

        public override string ToString() => JsonSerializer.Serialize<WebNamedColor>(this);


    }
}
