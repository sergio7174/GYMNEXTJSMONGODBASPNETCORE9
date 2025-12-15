// src/Models/ProductModel.cs

namespace ApiMDb.Models;
public class ProductModel
{
    public string? Name { get; set; }
    public string? Description { get; set; }
    public decimal? Price { get; set; }

    public decimal? StockQuantity { get; set; }
    public string? Category { get; set; }
    public IFormFile Image { get; set; } // For uploading the file
}