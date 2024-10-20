namespace TextProcessor.Application.Queries;

using MediatR;

public record SingularizeStringQuery(string Input) : IRequest<string>;