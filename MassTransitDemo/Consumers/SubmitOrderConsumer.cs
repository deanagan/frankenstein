using MassTransit;
using MassTransitDemo.Contracts;

namespace MassTransitDemo.Consumers;

public class SubmitOrderConsumer : IConsumer<SubmitOrder>
{
    public Task Consume(ConsumeContext<SubmitOrder> context)
    {
        Console.WriteLine($"✅ Received order: {context.Message.ProductName} x{context.Message.Quantity}");
        return Task.CompletedTask;
    }
}