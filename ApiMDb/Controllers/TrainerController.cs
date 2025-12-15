// src/Controllers/TrainersController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using System.IO;
using MongoDB.Driver;
using ApiMDb.Models.trainer;
using ApiMDb.Services;

namespace ApiMDb.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TrainersController : ControllerBase
{
    private readonly IMongoDatabase _database;
    private readonly IMongoCollection<Trainer> _trainers;
    private readonly IWebHostEnvironment _env;
    private readonly ILogger<TrainersController> _logger;

    public TrainersController(
        IMongoDBService mongoDBService,
        IWebHostEnvironment env,
        ILogger<TrainersController> logger )
    {
        _database = mongoDBService.Database;
        _trainers = _database.GetCollection<Trainer>("Trainer");
        _env = env;
         _logger = logger;
    }

    [HttpPost("create")]
    
    public async Task<IActionResult> Create([FromForm] TrainerModel model)
    {
         _logger.LogInformation("Iam at Trainer.controller- create - line 37 - model.name: " + model.Name);
        if (model.Image == null || model.Image.Length == 0)
        return BadRequest("No image uploaded");
        var imagePath = "";
        if (model.Image != null)
        _logger.LogInformation("Iam at Trainer.controller-register - line 42 - model.Image: " +  model.Image);
        {
            var uploadsFolder = Path.Combine(_env.WebRootPath, "uploads");
            Directory.CreateDirectory(uploadsFolder); // Creates folder if it doesn't exist
            if (!Directory.Exists(uploadsFolder)) Directory.CreateDirectory(uploadsFolder);
              
            
            var fileName = Path.GetFileName(model.Image.FileName);
            var filePath = Path.Combine(uploadsFolder, fileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
                await model.Image.CopyToAsync(stream);
            imagePath = "/Uploads/" + fileName;
        }

        var trainer = new Trainer
        {
              Name =      model.Name,
              Email =     model.Email,
              Age =       model.Age,
              Id_card =   model.Id_card,
              Phone =     model.Phone,
              Address =   model.Address,
              Gender =    model.Gender, 
              Field =     model.Field,
              Image = imagePath,
              CreateAt = DateTime.UtcNow
        };

        await _trainers.InsertOneAsync(trainer);
          _logger.LogInformation("Iam at Trainer.controller- create - line 75 - Trainer created Successfully: " +  trainer);
        //return Ok("Product created.");
        // Creates an anonymous object with a property Trainer whose value is the trainer variable.
        return Ok(new { Trainer = trainer });
    }

    [HttpGet("listAll")]
      public async Task<IActionResult> GetAll()
    {  
        var Staffs
     = await _trainers.Find(_ => true).ToListAsync();
        _logger.LogInformation("Iam at Trainer.controller- GetAll - line 85 - Trainers: " + Staffs
    );
        //return Ok(Trainers);
        return Ok( new { data = Staffs } );
    }

    [HttpGet("get-single-trainer/{id}")]
    
    public async Task<IActionResult> GetById(string id)
    {
         _logger.LogInformation("Iam at Trainer.controller- GetTrainer - line 95 - Id: " +  id);
        var trainer = await _trainers.Find(p => p.Id == id).FirstOrDefaultAsync();
        _logger.LogInformation("Iam at Trainer.controller- GetPackage - line 97 - trainer: " +  trainer);
        return trainer == null ? NotFound() : Ok(trainer);
    }

    [HttpPut("update-trainer/{id}")]
   
    public async Task<IActionResult> Update(string id, [FromForm] TrainerModel model)

    {
         _logger.LogInformation("Iam at Trainer.controller- update/{id} - line 106 - Id: " +  id);
        var trainer = await _trainers.Find(p => p.Id == id).FirstOrDefaultAsync();
        if (trainer == null) return NotFound();

        string newImagePath = "";
        if (model.Image != null)
        {
            var uploadsFolder = Path.Combine(_env.WebRootPath, "uploads");
            var fileName = Path.GetFileName(model.Image.FileName);
            var filePath = Path.Combine(uploadsFolder, fileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
                await model.Image.CopyToAsync(stream);
            newImagePath = "/uploads/" + fileName;
        }
              trainer.Name =    model.Name;
              trainer.Email  =  model.Email;
              trainer.Age  =    model.Age;
              trainer.Id_card = model.Id_card;
              trainer.Phone  =  model.Phone;
              trainer.Address = model.Address;
              trainer.Gender  = model.Gender;
              trainer.Field   = model.Field;
              trainer.Image = newImagePath;

        await _trainers.ReplaceOneAsync(p => p.Id == id, trainer);
         _logger.LogInformation("Iam at Trainer.controller- update/{id} - line 131 - Trainer Updated: " +  trainer);
        //return Ok("Trainer updated.");
        return Ok( trainer );
    }

    [HttpDelete("delete-trainer/{id}")]
    public async Task<IActionResult> Delete(string id)
    {
         _logger.LogInformation("Iam at Trainer.controller- delete/{id} - line 136 - Id: " +  id);
        await _trainers.DeleteOneAsync(p => p.Id == id);
        //return Ok("Trainer deleted.");
        return Ok(new { message = "Trainer deleted." });
    }

    [HttpPost("DeleteImage")]
      public async Task<IActionResult> DeleteImage([FromForm] ApiMDb.Models.package.DeleteImageRequest req)
    {
          _logger.LogInformation("Iam at Trainer.controller- deleteImage - line 144 - imageName: " + req.Image);
        if ( string.IsNullOrEmpty(req.Image))
            return BadRequest("Image name is required");

        string filename = Path.GetFileName(req.Image); // Extracts "member-3.png"
        var filePath = Path.Combine(_env.WebRootPath,"uploads",filename);
        /* _logger.LogInformation("Iam at Trainer.controller- deleteImage - line 154 - filename: " + filename);
        _logger.LogInformation("Iam at Trainer.controller- deleteImage - line 155 - filePath: " + filePath);
        _logger.LogInformation($"Iam at Trainer.controller- deleteImage - line 156 - Directory exists: {Directory.Exists(Path.GetDirectoryName(filePath))}");
        _logger.LogInformation($"Iam at Trainer.controller- deleteImage - line 157 -Path.GetDirectoryName: " + Path.GetDirectoryName(filePath));*/
        try
        {
            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
                var message = "Image deleted successfully";
                 _logger.LogInformation("Iam at Trainer.controller- deleteImage - line 160 - message: " + message);
                return Ok(message);
            }
            var messageNotFound = "Image file not found";
            _logger.LogInformation("Iam at Trainer.controller- deleteImage - line 164 - message: " + messageNotFound);
            return Ok(messageNotFound);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Server error: {ex.Message}");
        }
    }

}
