# escape=`
#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

#Depending on the operating system of the host machines(s) that will build or run the containers, the image specified in the FROM statement may need to be changed.
#For more information, please see https://aka.ms/containercompat

FROM mcr.microsoft.com/powershell:nanoserver-1809 AS downloadnodejs
SHELL ["pwsh", "-Command", "$ErrorActionPreference = 'Stop';$ProgressPreference='silentlyContinue';"]
RUN Invoke-WebRequest -OutFile nodejs.zip -UseBasicParsing "https://nodejs.org/dist/v10.16.3/node-v10.16.3-win-x64.zip"; `
Expand-Archive nodejs.zip -DestinationPath C:\; `
Rename-Item "C:\node-v10.16.3-win-x64" c:\nodejs

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-nanoserver-1809 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

COPY --from=downloadnodejs C:\nodejs\ C:\Windows\system32\


FROM mcr.microsoft.com/dotnet/core/sdk:3.1-nanoserver-1809 AS build
WORKDIR /src
COPY ["CaseNoroff/CaseNoroff.csproj", "CaseNoroff/"]
RUN dotnet restore "CaseNoroff/CaseNoroff.csproj"
COPY . .
WORKDIR "/src/CaseNoroff"
RUN dotnet build "CaseNoroff.csproj" -c Release -o /app/build

#COPY --from=downloadnodejs C:\nodejs\ C:\Windows\system32\

FROM build AS publish
RUN dotnet publish "CaseNoroff.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CaseNoroff.dll"]