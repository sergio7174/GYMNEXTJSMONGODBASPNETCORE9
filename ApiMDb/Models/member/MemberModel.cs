// src/Models//package/PackageModel.cs

using System.ComponentModel.DataAnnotations;

namespace ApiMDb.Models.member;

public class MemberModel
{  

    public string? Namemember { get; set; }
    public string? Client_CI { get; set; }
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public string? Nameplan { get; set; }
    public string? Code { get; set; }
    public string? Status { get; set; }
    public string? ImageUser { get; set; } // For uploading the file

    [DataType(DataType.Date)] // Ensures the UI treats it as a date
    public decimal? Timedays { get; set; }
    public decimal? Cost { get; set; }
  
}