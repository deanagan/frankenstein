namespace TextProcessor.API.Controllers;

using System.Threading.Tasks;

using MediatR;
using Microsoft.AspNetCore.Mvc;
using TextProcessor.API.Models;
using TextProcessor.Application.SingularizeString;

[Route("api/[controller]")]
[ApiController]
public class TextProcessorController(IMediator mediator) : ControllerBase
{
    private readonly IMediator _mediator = mediator;

    [HttpPost]
    [Route("singularize")]
    public async Task<IActionResult> Singularize(SingularizeRequest request)
    {
        if (string.IsNullOrEmpty(request.Content))
        {
            return BadRequest("No input.");
        }

        var result = await _mediator.Send(new SingularizeStringQuery(request.Content));

        return Ok(result);
    }
}