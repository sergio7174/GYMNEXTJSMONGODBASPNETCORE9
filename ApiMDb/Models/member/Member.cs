// src/Models//package/Package.cs
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace ApiMDb.Models.member;
public class Member
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    public string? Namemember { get; set; }
    public string? Client_CI { get; set; }
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public string? Nameplan { get; set; }
    public string? Code { get; set; }
    public string? Status { get; set; }
    public string? ImageUser { get; set; }

    [DataType(DataType.Date)] // Ensures the UI treats it as a date
    public DateTime FinishAt { get; set; } // Date field to save
    public decimal? Timedays { get; set; }
    public decimal? Cost { get; set; }
    public double? Leftdays { get; set; }
    public DateTime CreateAt { get; set; } // Read-only

}