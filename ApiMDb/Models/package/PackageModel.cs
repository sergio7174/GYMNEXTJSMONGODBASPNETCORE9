// src/Models//package/PackageModel.cs

namespace ApiMDb.Models.package;

public class PackageModel
{  
    public string? Nameplan { get; set; }
    public string? Description { get; set; }
    public IFormFile? Image { get; set; } // For uploading the file
    public string? Features { get; set; }
    public string? Code { get; set; }
    public string? Status { get; set; }
    public decimal? Trialdays { get; set; }
    public decimal? Timedays { get; set; }
    public decimal? Cost { get; set; }
}