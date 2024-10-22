namespace TextProcessor.Application.SingularizeString;

using MediatR;

public record SingularizeStringQuery(string Input) : IRequest<string>;