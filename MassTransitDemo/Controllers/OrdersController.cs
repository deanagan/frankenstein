using MassTransit;
using MassTransitDemo.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace MassTransitDemo.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly IPublishEndpoint _publishEndpoint;
    private readonly ISendEndpointProvider _sendEndpointProvider;

    public OrdersController(IPublishEndpoint publishEndpoint, ISendEndpointProvider sendEndpointProvider)
    {
        _publishEndpoint = publishEndpoint;
        _sendEndpointProvider = sendEndpointProvider;
    }

    [HttpPost("publish")]
    public async Task<IActionResult> SubmitOrderViaPublish()
    {
        var orderId = Guid.NewGuid();
        await _publishEndpoint.Publish(new SubmitOrder(orderId, "Cucumber", 3));
        return Ok(new { Message = "Published order", OrderId = orderId });
    }

    [HttpPost("send")]
    public async Task<IActionResult> SubmitOrderViaSend()
    {
        var endpoint = await _sendEndpointProvider.GetSendEndpoint(new Uri("queue:submit-order"));
        var orderId = Guid.NewGuid();
        await endpoint.Send(new SubmitOrder(orderId, "Direct Apple", 1));
        return Ok(new { Message = "Sent order", OrderId = orderId });
    }
}