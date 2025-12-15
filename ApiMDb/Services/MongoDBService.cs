// src/Services/MongoDBService.cs
using MongoDB.Driver;
using Microsoft.Extensions.Configuration;

namespace ApiMDb.Services
{
    public class MongoDBService : IMongoDBService
    {
        private readonly IMongoClient _client;
        private readonly IMongoDatabase _database;

        public MongoDBService(IConfiguration configuration)
        {
            var connectionString = configuration.GetSection("MongoDB:ConnectionString").Value;
            var databaseName = configuration.GetSection("MongoDB:DatabaseName").Value;
            _client = new MongoClient(connectionString);
            _database = _client.GetDatabase(databaseName);
        }

        public IMongoDatabase Database => _database;
    }
}