// src/Models/User.cs
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ApiMDb.Models;

public class User
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    public string? Username { get; set; }
    public string? Email { get; set; }
    public string? Password { get; set; }
    public string? IsAdmin { get; set; }
    public string? Image { get; set; }
    
    [BsonElement("createdAt")]
    public DateTime CreateAt { get; set; } // Read-only

}