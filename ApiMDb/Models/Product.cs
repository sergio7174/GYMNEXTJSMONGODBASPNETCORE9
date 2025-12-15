// src/Models/Product.cs
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ApiMDb.Models;
public class Product
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; }
    public decimal? Price { get; set; }
    public decimal? StockQuantity { get; set; }
    public string? Category { get; set; }
    public string? Image { get; set; } // Change from string to IFormFile
}