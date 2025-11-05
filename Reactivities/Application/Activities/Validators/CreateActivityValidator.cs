using System;
using System.Data;
using Application.Activities.Command;
using Application.Activities.DTOs;
using FluentValidation;

namespace Application.Activities.Validators;

public class CreateActivityValidator:
    BaseActivityValidator<CreateActivity.Command,CreateActivityDto>
{
    public CreateActivityValidator():base(x=>x.ActivityDto)
    {
    }
}
