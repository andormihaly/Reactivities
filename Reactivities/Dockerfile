FROM mcr.microsoft.com/dotnet/sdk:9.0 as build
WORKDIR /src

COPY Reactivities.sln ./
COPY  ./API/*.csproj API/
COPY ./Application/*.csproj Application/
COPY ./Domain/*.csproj Domain/
COPY ./Infrastructure/*.csproj Infrastructure/
COPY ./Persistence/*.csproj Persistence/

RUN dotnet restore Reactivities.sln

COPY ./API/ API
COPY ./Application/ Application
COPY ./Domain/ Domain
COPY ./Infrastructure/ Infrastructure
COPY ./Persistence/ Persistence

RUN dotnet publish "API/API.csproj" -c Release -o /src/out
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /run
COPY --from=build /src/out /run
ENTRYPOINT ["dotnet", "API.dll"]

