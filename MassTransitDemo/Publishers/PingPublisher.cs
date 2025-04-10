using MassTransit;
using MassTransitDemo.Contracts;


namespace MassTransitDemo.Publishers;

public class PingPublisher(ILogger<PingPublisher> logger, IBus bus) : BackgroundService
{
    
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            await Task.Yield();

            var keyPressed = Console.ReadKey(true);
            if (keyPressed.Key != ConsoleKey.Escape)
            {
                logger.LogInformation("Pressed {Button}", keyPressed.Key.ToString());
                await bus.Publish(new ButtonPing(keyPressed.Key.ToString()), stoppingToken);
            }

            await Task.Delay(200, stoppingToken);
        }
    }
}