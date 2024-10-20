namespace TextProcessor.Application.Queries;

using System.Threading;
using System.Threading.Tasks;

using MediatR;

public class SingularizeStringQueryHandler : IRequestHandler<SingularizeStringQuery, string>
{
    public Task<string> Handle(SingularizeStringQuery request, CancellationToken cancellationToken)
    {
        var result = request.Input.ToUpper();
        return Task.FromResult(result);
    }
}
