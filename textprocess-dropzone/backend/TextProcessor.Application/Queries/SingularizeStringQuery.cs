using MediatR;

namespace TextProcessor.Application.Queries;
public record SingularizeStringQuery(string Input) : IRequest<string>;