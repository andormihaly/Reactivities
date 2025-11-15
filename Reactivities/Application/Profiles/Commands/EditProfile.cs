using System;
using Application.Core;
using Application.Profiles.DTOs;
using MediatR;

namespace Application.Profiles.Commands;

public class EditProfile
{
    public class Command : IRequest<Result<Unit>>
    {
        public required UserProfile Profile { get; set; }
    }

    public  class Handler(Interfaces.IUserAccessor userAccessor, Persistence.AppDbContext context) 
    : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await userAccessor.GetUserAsync();

            if (user == null)
            {
                  return Result<Unit>.Failure("Can't find profile",400);
            }
            user.DisplayName = request.Profile.DisplayName;
            user.Bio = request.Profile.Bio;

            var result = await context.SaveChangesAsync(cancellationToken)>0;
            return result
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure("Saving to the database of profile failed",400);

        }
    }
}
