using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using ApiMDb.Controllers;
using ApiMDb.Models;
using ApiMDb.Services;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MongoDB.Driver;
using BCrypt.Net;
using Scalar.AspNetCore; // Add this using directive
using MongoDB.Bson.Serialization;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSingleton<JwtService>();
// MongoDB Configuration
builder.Services.AddSingleton<IMongoDBService, MongoDBService>();

var app = builder.Build();

// to serve statics files
app.UseStaticFiles(); 

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    /**The app.MapOpenApi() method in ASP.NET Core is used to generate and serve an OpenAPI (Swagger) document for your API. This document describes your API's endpoints, request/response formats, and other metadata, enabling tools like Swagger UI or Postman to interact with your API programmatically.Generates OpenAPI Document
It creates a machine-readable OpenAPI specification (in JSON or YAML format) based on your API controllers and models.
Serves the Document
Makes the OpenAPI document accessible at a specific route (e.g., /openapi.json), which tools like Swagger UI can consume.
Enables API Documentation
Works with Swagger UI to provide an interactive, browser-based interface for testing and exploring your API.*/
    app.MapOpenApi();
/**The app.MapScalarApiReference() method in ASP.NET Core is used to generate and serve an interactive API documentation interface using the Scalar tool. Scalar is a modern, user-friendly API documentation tool that provides a clean, responsive UI for exploring and testing API endpoints, similar to Swagger UI or Postman.reates a machine-readable OpenAPI (Swagger) document based on your API controllers and models.
Serves an Interactive UI
Provides a browser-based interface (Scalar UI) where developers can:
Explore API endpoints.
View request/response examples.
Test endpoints directly in the browser.
Simplifies API Exploration
Scalar's UI is designed to be more modern and intuitive compared to older tools like Swagger UI.**/
    app.MapScalarApiReference();
}
/***The app.UseHttpsRedirection() method in ASP.NET Core is a middleware that redirects HTTP requests to HTTPS to enforce secure communication. This is critical for ensuring data integrity and confidentiality, especially in production environments.Redirects HTTP to HTTPS
When an HTTP request is received (e.g., http://example.com), this middleware sends a 307 Temporary Redirect to the HTTPS version of the same URL (e.g., https://example.com).
Enforces Secure Communication
Prevents insecure HTTP traffic by ensuring all communication uses HTTPS (TLS/SSL encryption).
Development/Testing Use
Commonly used in development to simulate secure environments. In production, HTTPS is typically enforced by reverse proxies (e.g., IIS, Nginx, or cloud services like Azure/AWS).**/
app.UseHttpsRedirection();
/**The app.UseCors() method in ASP.NET Core is a middleware that enables Cross-Origin Resource Sharing (CORS) for your application. It allows your API to accept requests from different domains (origins) than the one it's hosted on, which is essential for modern web and mobile applications.**/
app.UseCors(options=>{
    options.AllowAnyHeader();
    options.AllowAnyMethod();
    options.AllowAnyOrigin();
}
);

/**The app.MapControllers(); line in an ASP.NET Core application is used to enable attribute-based routing for controllers. It tells the framework to scan all controllers in the application and map their routes based on the [Route], [HttpGet], [HttpPost], etc., attributes defined on the controller or its actions.Maps Controller Routes
It registers routes for all controllers that use attribute routing (e.g., [ApiController], [Route("api/[controller]")]).
Enables Attribute-Based Endpoints
Without this line, the framework will not recognize routes defined with attributes on controllers or actions.
Part of the Endpoint Routing Pipeline
It is typically placed after app.UseRouting() and before other middleware like app.UseAuthorization() or app.UseEndpoints() (in older ASP.NET Core versions).**/
app.MapControllers();
app.UseHttpsRedirection();


app.Run();

