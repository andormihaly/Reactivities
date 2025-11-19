using System;

namespace Application.Profiles.DTOs;

public class UserActivityDto
{
    public required string Id { get; set; } = string.Empty;
    public required string Title { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public  required string Category { get; set; }= string.Empty;
}
