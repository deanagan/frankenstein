using System.IO;
using System.Threading.Tasks;

using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using TextProcessor.Application.Queries;

namespace MyApiProject.Controllers;

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
    public async Task<IActionResult> Singularize(string input)
    {
        if (string.IsNullOrEmpty(input))
            return BadRequest("No input.");

        var result = await _mediator.Send(new SingularizeCommand(content));

        return Ok(result);
    }
}

