using System;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Application.Profiles.Commands;

public class SetMainPhoto
{
public class Command : IRequest<Result<Unit>>
    {
        public required string PhotoId { get; set; }
    }
    public class Handler(IUserAccessor userAccessor, AppDbContext context)
     : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await userAccessor.GetUserWithPhotosAsync();

            var photo = user.Photos.FirstOrDefault(x=>x.Id == request.PhotoId);

            if (photo == null)
            {
              return Result<Unit>.Failure("Cannot find photo",400);
            }
           
           user.ImageUrl=photo.Url;

           var result = await context.SaveChangesAsync()>0;

            return result
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure("Saving to the database of main photo failed",400);
        }
    }
}
