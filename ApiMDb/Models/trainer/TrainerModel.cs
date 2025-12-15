// src/Models//package/PackageModel.cs

namespace ApiMDb.Models.trainer;

public class TrainerModel
{  
    public string? Name { get; set; }
    public string? Email { get; set; }
    public decimal? Age { get; set; }
    public string?  Id_card { get; set; }
    public string? Phone { get; set; }
    public string? Address { get; set; }
    public string? Gender { get; set; }
    public string? Field { get; set; }
    public IFormFile? Image { get; set; } // For uploading the file
    
}