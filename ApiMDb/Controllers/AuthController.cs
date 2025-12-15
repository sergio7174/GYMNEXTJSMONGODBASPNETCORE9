// src/Controllers/AuthController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using System.IO;
using BCrypt.Net;
using System.Security.Claims;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using ApiMDb.Models;
using ApiMDb.Services;

namespace ApiMDb.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IMongoDatabase _database;
    private readonly IMongoCollection<User> _users;
    private readonly IWebHostEnvironment _env;
    private readonly JwtService _jwtService;
    private readonly ILogger<AuthController> _logger; // like console.log in JavaScript

    public AuthController(
        IMongoDBService mongoDBService,
        IWebHostEnvironment env,
        JwtService jwtService,
        ILogger<AuthController> logger )
    {
        _database = mongoDBService.Database;
        _users = _database.GetCollection<User>("Users");
        _env = env;
        _jwtService = jwtService;
        _logger = logger;
    }

    [HttpPost("register")]
     /* Remember to check how you sent Data, user={} --> FromBody, user=formData --> FromForm **/
    public async Task<IActionResult> Register([FromForm] RegisterModel model)
    {
        var existingUser = await _users.Find(u => u.Email == model.Email).FirstOrDefaultAsync();
        if (existingUser != null){ 
        
        var email = model.Email;
           //return BadRequest("User already exists.");
           return Ok(new { Email = email });}

           /*_logger.LogInformation("Iam at Auth.controller-register - line 50 - model.Username: " + model.Username);
           _logger.LogInformation("Iam at Auth.controller - register - line 51 - model.Password:  " + model.Password);
           _logger.LogInformation("Iam at Auth.controller - register - line 52 - model.Email:  " + model.Email);*/

        string imagePath = "";
        if (model.Image != null)
        {
            var uploadsFolder = Path.Combine(_env.WebRootPath, "Uploads");
            if (!Directory.Exists(uploadsFolder)) Directory.CreateDirectory(uploadsFolder);
            var fileName = Path.GetFileName(model.Image.FileName);
            var filePath = Path.Combine(uploadsFolder, fileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
                await model.Image.CopyToAsync(stream);
            imagePath = "/Uploads/" + fileName;
        }

        var user = new User
        {
            Username = model.Username,
            Email = model.Email,
            Password = BCrypt.Net.BCrypt.HashPassword(model.Password),
            IsAdmin = model.IsAdmin,
            Image = imagePath,
            CreateAt = DateTime.UtcNow
        };

        await _users.InsertOneAsync(user);

         //_logger.LogInformation("Iam at Auth.controller - register - line 78 - User Id:  " + user.Id);
         //_logger.LogInformation("Iam at Auth.controller - register - line 79 - User Created:  " + user.Username);
         var message = "User registered successfully.";
         return Ok( new { message = message, user = user } );
         // return Ok( user );
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginModel model)
    {
         //_logger.LogInformation("Iam at Auth.controller - login - line 88 - User email:  " + model.Email);
        var user = await _users.Find(u => u.Email == model.Email).FirstOrDefaultAsync();
        if (user == null || !BCrypt.Net.BCrypt.Verify(model.Password, user.Password))
            return Unauthorized("Invalid credentials.");

        var token = _jwtService.GenerateToken(user.Email);
        var isAdmin = user.IsAdmin;
        //_logger.LogInformation("Iam at Auth.controller - login - line 93 - token:  " + token);
        return Ok(new { Token = token, user = user });
        //return Ok( token );
    }

    // function to get at leat One Admin
    [HttpGet("getoneadmin")]
    public async Task<IActionResult> GetOneAdmin()
    {   
        //var isAdmin = User.Claims
    //.FirstOrDefault(c => c.Type == ClaimTypes.Role && c.Value == "true")?.Value;
        var isAdmin = "true";
        var haveAdmin = await _users.Find(u => u.IsAdmin == isAdmin).FirstOrDefaultAsync();
     //_logger.LogInformation("I am at AuthController - GetOneAdmin - line 108 - haveAdmin: " + haveAdmin.Email);   
        if (haveAdmin != null)
{   //_logger.LogInformation("I am at AuthController - GetOneAdmin - line 104");
    _logger.LogInformation("I am at AuthController - GetOneAdmin - line 111 - haveAdmin: " + haveAdmin);
    //return Ok( haveAdmin );
    return Ok( haveAdmin );
}
else
{
    _logger.LogInformation("I am at AuthController - GetOneAdmin - line 116 - Admin: " + haveAdmin);
    
    return Ok( haveAdmin ); // Or return the appropriate result
}
        
    }

    [HttpGet("profile")]
    public async Task<IActionResult> GetProfile()
    {
       // _logger.LogInformation("Iam at Auth.controller - profile - line 110:  ");
        var email = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
        var user = await _users.Find(u => u.Email == email).FirstOrDefaultAsync();
        return Ok(user);
    }

    [HttpPut("update")]
    [Authorize]
    public async Task<IActionResult> UpdateUser([FromForm] RegisterModel model)
    {
        var email = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
        var user = await _users.Find(u => u.Email == email).FirstOrDefaultAsync();

        if (user == null) return NotFound();

        /*string newImagePath = user.ImagePath;
        if (model.Image != null)
        {
            var uploadsFolder = Path.Combine(_env.WebRootPath, "Uploads");
            var fileName = Path.GetFileName(model.Image.FileName);
            var filePath = Path.Combine(uploadsFolder, fileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
                await model.Image.CopyToAsync(stream);
            newImagePath = "/Uploads/" + fileName;
        }*/

        user.Username = model.Username;
        //user.ImagePath = newImagePath;

        await _users.ReplaceOneAsync(u => u.Email == email, user);
        return Ok("User updated.");
    }

    [HttpDelete("delete")]
    [Authorize]
    public async Task<IActionResult> DeleteUser()
    {
        var email = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
        await _users.DeleteOneAsync(u => u.Email == email);
        return Ok("User deleted.");
    }
}