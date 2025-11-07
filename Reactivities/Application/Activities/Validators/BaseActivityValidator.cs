using System;
using Application.Activities.DTOs;
using FluentValidation;

namespace Application.Activities.Validators;

public class BaseActivityValidator<T,TDto>:AbstractValidator<T> where TDto: BaseActivityDto
{
    public BaseActivityValidator(Func<T,TDto> selector)
    {
        RuleFor(x =>selector(x).Title)
        .NotEmpty().WithMessage("Title is required!")
        .MaximumLength(100).WithMessage("Title must not exceeds 100 char");
        
        RuleFor(x => selector(x).Description)
        .NotEmpty().WithMessage("Description is required!")
        .MaximumLength(100).WithMessage("Description must not exceeds 100 char");

        RuleFor(x => selector(x).Date)
        .GreaterThan(DateTime.UtcNow).WithMessage("Date must be in the future");

        RuleFor(x => selector(x).Category)
        .NotEmpty().WithMessage("Description is required!")
        .MaximumLength(100).WithMessage("Category must not exceeds 100 char");

        RuleFor(x => selector(x).City)
        .NotEmpty().WithMessage("Description is required!")
        .MaximumLength(100).WithMessage("City must not exceeds 100 char");

        RuleFor(x => selector(x).Venue)
        .NotEmpty().WithMessage("Description is required!")
        .MaximumLength(500).WithMessage("Venue must not exceeds 100 char");

        RuleFor(x => selector(x).Latitude)
        .NotEmpty().WithMessage("Latitude is required!")
        .InclusiveBetween(-90, 90).WithMessage("Latitude must be between -90 and 90!");
       
        RuleFor(x => selector(x).Longitude)
        .NotEmpty().WithMessage("Longitude is required!")
        .InclusiveBetween(-180, 180).WithMessage("Longitude must be between -180 and 180!");
    }
}
