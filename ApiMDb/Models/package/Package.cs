// src/Models//package/Package.cs
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ApiMDb.Models.package;

public class Package
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    public string? Nameplan { get; set; }
    public string? Description { get; set; }
    public string? Image { get; set; }
    public string? Features { get; set; }
    public string? Code { get; set; }
    public string? Status { get; set; }
    public decimal? Trialdays { get; set; }
    public decimal? Timedays { get; set; }
    public decimal? Cost { get; set; }
    public DateTime CreateAt { get; set; } // Read-only
}