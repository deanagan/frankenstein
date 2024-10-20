namespace TextProcessor.API.Controllers;

using System.IO;
using System.Threading.Tasks;

using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using TextProcessor.Application.Queries;

[Route("api/[controller]")]
[ApiController]
public class TextProcessorController : ControllerBase
{
    private readonly IMediator _mediator;

    public TextProcessorController(IMediator mediator)
    {
        _mediator = mediator;
    }

    // POST api/upload
    [HttpPost]
    [Route("singularize")]
    public async Task<IActionResult> Singularize(string content)
    {
        if (string.IsNullOrEmpty(content))
        {
            return BadRequest("No input.");
        }

        var result = await _mediator.Send(new SingularizeStringQuery(content));

        return Ok(result);
    }
}
