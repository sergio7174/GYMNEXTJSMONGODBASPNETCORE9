// src/Services/IMongoDBService.cs
using MongoDB.Driver;

namespace ApiMDb.Services

{
    public interface IMongoDBService
    {
        IMongoDatabase Database { get; }
    }
}