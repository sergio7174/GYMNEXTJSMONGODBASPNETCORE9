// src/Models/RegisterModel.cs
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ApiMDb.Models;
public class RegisterModel
{
    public string? Username { get; set; }
    public string? Email { get; set; }
    public string? Password { get; set; }
    public string? IsAdmin { get; set; }
    public IFormFile Image { get; set; } // For uploading the file  
}