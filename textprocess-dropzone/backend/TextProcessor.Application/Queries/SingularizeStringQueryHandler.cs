using MediatR;
using System.Threading;
using System.Threading.Tasks;


namespace TextProcessor.Application.Queries;

public class SingularizeStringQueryHandler : IRequestHandler<SingularizeStringQuery, string>
{
    public Task<string> Handle(SingularizeStringQuery request, CancellationToken cancellationToken)
    {
        var result = request.Input.ToUpper();
        return Task.FromResult(result);
    }
}
