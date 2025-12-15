// src/Controllers/ClassesController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using System.IO;
using MongoDB.Driver;
using ApiMDb.Models.classe;
using ApiMDb.Services;

namespace ApiMDb.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ClassesController : ControllerBase
{
    private readonly IMongoDatabase _database;
    private readonly IMongoCollection<Classe> _classes;
    private readonly IWebHostEnvironment _env;
    private readonly ILogger<ClassesController> _logger;

    public ClassesController(
        IMongoDBService mongoDBService,
        IWebHostEnvironment env,
        ILogger<ClassesController> logger )
    {
        _database = mongoDBService.Database;
        _classes = _database.GetCollection<Classe>("Classe");
        _env = env;
         _logger = logger;
    }

    [HttpPost("createClass")]
    
    public async Task<IActionResult> Create([FromForm] ClasseModel model)
    {
         _logger.LogInformation("Iam at Classes.controller- create - line 37 - model.Classname: " + model.Classname);
        if (model.Image == null || model.Image.Length == 0)
        return BadRequest("No image uploaded");
        var imagePath = "";
        if (model.Image != null)
        _logger.LogInformation("Iam at Classes.controller-register - line 42 - model.Image: " +  model.Image);
        {
            var uploadsFolder = Path.Combine(_env.WebRootPath, "uploads");
            Directory.CreateDirectory(uploadsFolder); // Creates folder if it doesn't exist
            if (!Directory.Exists(uploadsFolder)) Directory.CreateDirectory(uploadsFolder); 
            var fileName = Path.GetFileName(model.Image.FileName);
            var filePath = Path.Combine(uploadsFolder, fileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
                await model.Image.CopyToAsync(stream);
            imagePath = "/uploads/" + fileName;
        }

        var classe = new Classe
        {
              Classname =      model.Classname,
              Code =           model.Code,
              Classday =       model.Classday,
              Classtime  =     model.Classtime,
              Classlevel =     model.Classlevel,
              Trainer  =       model.Trainer,
              Key_benefits =   model.Key_benefits,
              Expert_trainer = model.Expert_trainer,
              Class_overview = model.Class_overview,
              Why_matters  =   model.Why_matters,
              DateBegin =      model.DateBegin,
              DateEndClass =   model.DateEndClass,
              Session_time  =  model.Session_time,
              Price   =        model.Price,
              Image = imagePath,
              CreateAt = DateTime.UtcNow
        };

        await _classes.InsertOneAsync(classe);
          _logger.LogInformation("Iam at Classes.controller- create - line 81 - Trainer created Successfully: " +  classe);
        //return Ok("Class created.");
        // Creates an anonymous object with a property Trainer whose value is the trainer variable.
        var message = "Class created successfully";
        return Ok(new { message = message, Classe = classe });
    
    }

    [HttpGet("listAll")]
      public async Task<IActionResult> GetAll()
    {
            _logger.LogInformation("Iam at Classes.controller- GetAll - line 85 - Entered GetAll method");
         try 
        {var Classes = await _classes.Find(_ => true).ToListAsync();
        _logger.LogInformation("Iam at Classes.controller- GetAll - line 86 - Classes: " + Classes);
        //return Ok(packs);
        return Ok( new { data = Classes } );
    }
    
    catch (Exception ex)
    {
        _logger.LogError("Error in GetAll: " + ex.Message);
        return StatusCode(500, "Internal server error");
    }
    }

    [HttpGet("get-single-classe/{id}")]
    public async Task<IActionResult> GetById(string id)
    {
         _logger.LogInformation("Iam at Classes.controller- GetClasse - line 100 - Id: " +  id);
        var classe = await _classes.Find(p => p.Id == id).FirstOrDefaultAsync();
        _logger.LogInformation("Iam at Classes.controller- GetClasse - line 102 - classe: " + classe);
        return classe == null ? NotFound() : Ok(classe);
    }

    [HttpPut("update-classe/{id}")]
   
    public async Task<IActionResult> Update(string id, [FromForm] ClasseModel model)

    {
         _logger.LogInformation("Iam at Classes.controller- update/{id} - line 111 - Id: " +  id);
        var classe = await _classes.Find(p => p.Id == id).FirstOrDefaultAsync();
        if (classe == null) return NotFound();

        string newImagePath = "";
        if (model.Image != null)
        {
            var uploadsFolder = Path.Combine(_env.WebRootPath, "Uploads");
            var fileName = Path.GetFileName(model.Image.FileName);
            var filePath = Path.Combine(uploadsFolder, fileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
                await model.Image.CopyToAsync(stream);
            newImagePath = "/Uploads/" + fileName;
        }
              
              classe.Classname =      model.Classname;
              classe.Code =           model.Code;
              classe.Classday =       model.Classday;
              classe.Classtime =      model.Classtime;
              classe.Classlevel =     model.Classlevel;
              classe.Trainer  =       model.Trainer;
              classe.Key_benefits =   model.Key_benefits;
              classe.Expert_trainer = model.Expert_trainer;
              classe.Class_overview = model.Class_overview;
              classe.Why_matters =    model.Why_matters;
              classe.DateBegin =      model.DateBegin;
              classe.Session_time =   model.Session_time;
              classe.Price  =         model.Price;
              classe.Image =          newImagePath;

        await _classes.ReplaceOneAsync(p => p.Id == id, classe);
         _logger.LogInformation("Iam at Classes.controller- update/{id} - line 142 - Classe Updated: " +  classe);
        //return Ok("Classe updated.");
        return Ok( classe );
    }

    [HttpDelete("delete-classe/{id}")]
    public async Task<IActionResult> Delete(string id)
    {
         _logger.LogInformation("Iam at Classe.controller- delete/{id} - line 151 - Id: " +  id);
        await _classes.DeleteOneAsync(p => p.Id == id);
        //return Ok("Class deleted.");
        return Ok(new { message = "Class deleted." });
    }

    [HttpPost("DeleteImage")]
     public async Task<IActionResult> DeleteImage([FromForm] ApiMDb.Models.package.DeleteImageRequest req)
    {
          _logger.LogInformation("Iam at Classes.controller- deleteImage - line 161 - imageName: " + req.Image);
        if ( string.IsNullOrEmpty(req.Image))
            return BadRequest("Image name is required");
        string filename = Path.GetFileName(req.Image); // Extracts "member-3.png"
        var filePath = Path.Combine(_env.WebRootPath, "uploads", filename);
        
        try
        {
            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
                var message = "Image deleted successfully";
                 _logger.LogInformation("Iam at Classes.controller- deleteImage - line 171 - message: " + message);
                return Ok(message);
            }
            var messageNotFound = "Image file not found";
            _logger.LogInformation("Iam at Classes.controller- deleteImage - line 175 - message: " + messageNotFound);
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
