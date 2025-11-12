using MediatR;
using Persistence;
using Domain;
using Application.Core;
using Microsoft.EntityFrameworkCore;
using Application.Activities.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;

namespace Application.Activities.Queries;

public class GetActivityDetails
{
    public class Query : IRequest<Result<ActivityDto>>
    {
        public required string Id { get; set;}
    }
    public class Handler(AppDbContext context,IMapper mapper) : IRequestHandler<Query, Result<ActivityDto>>
    {
        public async Task<Result<ActivityDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            //var activity = await context.Activities.FindAsync([request.Id], cancellationToken);
            
            //eager loading
           // var activity = await context.Activities
           //.Include(x=>x.Attendees)
           //.ThenInclude(x=>x.User)
           //.FirstOrDefaultAsync(x=>x.Id==request.Id, cancellationToken);
            
           var activity = await context.Activities
           .ProjectTo<ActivityDto>(mapper.ConfigurationProvider)
           .FirstOrDefaultAsync(x=>x.Id==request.Id, cancellationToken);

            if (activity == null)
            {
                return Result<ActivityDto>.Failure("Activity Not Found", 404);
            }

            //return Result<ActivityDto>.Success(mapper.Map<ActivityDto>(activity));

            return Result<ActivityDto>.Success(activity);

        }
    }
}
