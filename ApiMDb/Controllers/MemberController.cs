// src/Controllers/MembersController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using System.IO;
using MongoDB.Driver;
using MongoDB.Bson;
using ApiMDb.Models.member;
using ApiMDb.Services;

namespace ApiMDb.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MembersController : ControllerBase
{
    private readonly IMongoDatabase _database;
    private readonly IMongoCollection<Member> _members;
    private readonly IWebHostEnvironment _env;
    private readonly ILogger<MembersController> _logger;

    public MembersController(
        IMongoDBService mongoDBService,
        IWebHostEnvironment env,
        ILogger<MembersController> logger )
    {
        _database = mongoDBService.Database;
        _members = _database.GetCollection<Member>("Member");
        _env = env;
         _logger = logger;
    }

    [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody] MemberModel model)
    {
         _logger.LogInformation("Iam at Members.controller- create - line 36 - model.ImageUser: " + model.ImageUser);
         _logger.LogInformation("Iam at Members.controller- create - line 37 - model.Email: " + model.Email);
         // Example: Check by username
        var Email = model.Email;
        var memberExist = await _members.Find(p => p.Email == Email).FirstOrDefaultAsync();
        // Example: Check by username
        if ( memberExist != null)
           {
             _logger.LogInformation("Iam at Members.controller- create - line 44 - memberExist: " + memberExist);
             var messagemExist = "A member with this Email already exists.";
             //return Ok( new { messagemExist = messagemExist} );
             return Ok(messagemExist);
            }
        
         // Get current date
        DateTime currentDate = DateTime.Now;
        
        // Add timedays to current date
        // Convert decimal to double for AddDays
        DateTime futureDate = currentDate.AddDays((double)model.Timedays.Value);
    
        // Calculate days between dates
        double leftdays = (futureDate - currentDate).TotalDays;
        var Status = "true";

        

        var member = new Member
        {

              Namemember =  model.Namemember,
              Client_CI =   model.Client_CI,
              Email =       model.Email,             
              Phone =       model.Phone,             
              Nameplan =    model.Nameplan,          
              Timedays =    model.Timedays,
              Cost =        model.Cost,
              Code =        model.Code,
              Status=       Status,               
              ImageUser =   model.ImageUser,
              Leftdays =    leftdays,
              CreateAt =    DateTime.UtcNow,
              FinishAt =    futureDate
        };

        await _members.InsertOneAsync(member);
          _logger.LogInformation("Iam at members.controller- create - line 73 - Member created Successfully: " +  member);
        //return Ok("Member created.");
        // Creates an anonymous object with a property Package whose value is the package variable.
        return Ok(new { Member = member });
    }

    [HttpGet("listAll")]
      public async Task<IActionResult> GetAll()
    {  
        var members = await _members.Find(_ => true).ToListAsync();
        _logger.LogInformation("Iam at members.controller- GetAll - line 83 - Members: " + members);
        return Ok( new { data = members } );
    }

    [HttpGet("get-single-member/{id}")]
    
    public async Task<IActionResult> GetById(string id)
    {
        // Validate the input ID
    if (string.IsNullOrEmpty(id) || !ObjectId.TryParse(id, out var objectId))
    {
        return BadRequest("Invalid MongoDB ObjectId provided.");
    }
         _logger.LogInformation("Iam at members.controller- get-single-member/{id} - line 99 - Id: " +  id);
        var member = await _members.Find(p => p.Id == id).FirstOrDefaultAsync();
        _logger.LogInformation("Iam at members.controller- Getmember - line 101 - member: " + member);
        return member == null ? NotFound() : Ok(new { Member = member });
    }

   /// <param name="email">The email of the member to retrieve.</param>
    /// <returns>The member if found; otherwise, 404 Not Found.</returns>
    [HttpGet("get-single-memberbyemail")]
    public async Task<IActionResult> GetByEmail([FromQuery] string email)
    {
     _logger.LogInformation("Iam at members.controller- get-single-memberbyemail - line 110 - email: " +  email);
        
    if (string.IsNullOrEmpty(email))
           { return BadRequest("Email is required.");}

    var memberByEmail = await _members.Find(p => p.Email == email).FirstOrDefaultAsync();  
     _logger.LogInformation("Iam at members.controller- get-single-memberbyemail - line 116 - memberByEmail: " +  memberByEmail);
     var member = memberByEmail;
    return memberByEmail == null ? NotFound() : Ok(new { data = member });
    }

    [HttpPut("update-member/{id}")]
   
    public async Task<IActionResult> Update(string id, [FromForm] MemberModel model)

    {
         _logger.LogInformation("Iam at members.controller- update/{id} - line 102 - Id: " +  id);
        var member = await _members.Find(p => p.Id == id).FirstOrDefaultAsync();
        if (member == null) return NotFound();

              member.Nameplan =   model.Nameplan;
              member.Namemember = model.Namemember;
              member.Client_CI  = model.Client_CI;
              member.Email  =     model.Email;             
              member.Phone  =     model.Phone;             
              member.Nameplan  =  model.Nameplan;          
              member.Timedays  =  model.Timedays;
              member.Cost  =      model.Cost;
              member.Code  =      model.Code;
              member.Status  =    model.Status;            
              member.ImageUser =  model.ImageUser;

        await _members.ReplaceOneAsync(p => p.Id == id, member);

        //return Ok("Member updated.");
        return Ok( member );
    }

   [HttpPut("update-memberStatus/{id}")]
   
    public async Task<IActionResult> UpdateMemberStatus(string id, [FromForm] MemberModel model)

    {
         _logger.LogInformation("Iam at members.controller- update/{id} - line 152 - Id: " +  id);
        var member = await _members.Find(p => p.Id == id).FirstOrDefaultAsync();
        if (member == null) return NotFound();
        
              member.Status  =    model.Status;            
        await _members.ReplaceOneAsync(p => p.Id == id, member);

        return Ok( member );
    }

    [HttpDelete("delete-member/{id}")]
    
    public async Task<IActionResult> Delete(string id)
    {
         _logger.LogInformation("Iam at members.controller- delete/{id} - line 138 - Id: " +  id);
        await _members.DeleteOneAsync(p => p.Id == id);
        return Ok("Member deleted.");
    }

    [HttpPost("DeleteImage")]
     public IActionResult DeleteImage([FromForm]string image)
    {
          _logger.LogInformation("Iam at members.controller- deleteImage - line 146 - imageName: " + image);
        if ( string.IsNullOrEmpty(image))
            return BadRequest("Image name is required");

        string filename = Path.GetFileName(image); // Extracts "member-3.png"
        var filePath = Path.Combine(_env.WebRootPath, "uploads", filename);
        
        try
        {
            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
                var message = "Image deleted successfully";
                 _logger.LogInformation("Iam at Members.controller- deleteImage - line 158 - message: " + message);
                return Ok(message);
            }
            var messageNotFound = "Image file not found";
            _logger.LogInformation("Iam at members.controller- deleteImage - line 162 - message: " + messageNotFound);
            return Ok(messageNotFound);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Server error: {ex.Message}");
        }
    
    // DateTime currentDateOnly = DateTime.Today;
    // Add days to date-only value
    // DateTime futureDateOnly = currentDateOnly.AddDays(req.Body.Timedays);
    }
}


