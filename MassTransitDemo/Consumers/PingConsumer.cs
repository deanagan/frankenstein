using MassTransit;
using MassTransitDemo.Contracts;

namespace MassTransitDemo.Consumers;

public class PingConsumer : IConsumer<ButtonPing>
{
    public Task Consume(ConsumeContext<ButtonPing> context)
    {
        Console.WriteLine($"Ping Consumer Received ping: {context.Message.Button}");
        return Task.CompletedTask;
    }
}