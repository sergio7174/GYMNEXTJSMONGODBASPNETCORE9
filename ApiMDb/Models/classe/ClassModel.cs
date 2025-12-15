// src/Models//package/PackageModel.cs

using System.ComponentModel.DataAnnotations;

namespace ApiMDb.Models.classe;

public class ClasseModel
{  
    public string? Classname { get; set; }
    public string? Code { get; set; }
    public string? Classday { get; set; }
    public string? Classtime { get; set; }
    public string? Classlevel { get; set; }
    public string? Trainer { get; set; }
    public string? Key_benefits { get; set; }
    public string? Expert_trainer { get; set; }
    public string? Class_overview { get; set; }
    public string? Why_matters { get; set; }
    public IFormFile Image { get; set; } // For uploading the file

    [DataType(DataType.Date)] // Ensures the UI treats it as a date
    public DateTime DateBegin { get; set; } // Date field to save

    [DataType(DataType.Date)] // Ensures the UI treats it as a date
    public DateTime DateEndClass { get; set; } // Date field to save

    public decimal? Session_time { get; set; }
    public decimal? Price { get; set; }
    
    
}