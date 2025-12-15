// src/Models//package/Package.cs
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ApiMDb.Models.trainer;

public class Trainer
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    public string? Name { get; set; }
    public string? Email { get; set; }
    public decimal? Age { get; set; }
    public string?  Id_card { get; set; }
    public string? Phone { get; set; }
    public string? Address { get; set; }
    public string? Gender { get; set; }
    public string? Field { get; set; }
    public string? Image { get; set; }
    public DateTime CreateAt { get; set; } // Read-only

}