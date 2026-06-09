FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /app

COPY . .

RUN dotnet restore
RUN dotnet publish -c Release -o /publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0

RUN useradd -m appuser

USER appuser

WORKDIR /app

ENV ASPNETCORE_URLS=http://+:8080

COPY --from=build /publish .

EXPOSE 8080

ENTRYPOINT ["dotnet", "SpaceGuard.dll"]