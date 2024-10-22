namespace TextProcessor.Application.SingularizeString;

using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

using MediatR;

public record MyData
{
    public string Name { get; init; }

    public int Age { get; init; }
}

public class SingularizeStringQueryHandler : IRequestHandler<SingularizeStringQuery, string>
{
    public Task<string> Handle(SingularizeStringQuery request, CancellationToken cancellationToken)
    {
        var data = JsonSerializer.Deserialize<MyData>(request.Input);
        return Task.FromResult(data.ToString());
    }
}