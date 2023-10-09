# Get a base image to work from download the .net sdk from a public repository 
# where microsoft store their images. The version of SKD after the ":" must match
# the version of dotnet running in your environment. In my environment, I am using
# donet core 7.0, so I am asking for version 7 of the sdk
FROM mcr.microsoft.com/dotnet/sdk:7.0 as build
# create a working directory inside of docker file system
WORKDIR /app
# expose the port that will be used internally inside of docker
EXPOSE 80

# copy all .csproj files and restore as distinct layers. Use of the same copy command
# for ever dockerfile in the project to take advantage of the cocker caching.

# copy the solution to from our coputer into the working directory inside docker. Since we're in the root 
# directory, we don't have to specify a path.
COPY carsties.sln carsties.sln
# copy the project file and make sure they are in the same location in docker
COPY src/AuctionService/AuctionService.csproj src/AuctionService/AuctionService.csproj
COPY src/SearchService/SearchService.csproj src/SearchService/SearchService.csproj
COPY src/BiddingService/BiddingService.csproj src/BiddingService/BiddingService.csproj
COPY src/GatewayService/GatewayService.csproj src/GatewayService/GatewayService.csproj
COPY src/Contracts/Contracts.csproj src/Contracts/Contracts.csproj
COPY src/IdentityService/IdentityService.csproj src/IdentityService/IdentityService.csproj

# Restore package dependicies - we have access into the dotnet cls inside here 
# because we are in the context of using the dotnet sdk.
RUN dotnet restore carsties.sln

# COPY app folder over
COPY src/GatewayService src/GatewayService
# Change the working directory where we can publish the files.
WORKDIR /app/src/GatewayService
# Using dotnet publish to push AuctionService into the output directory of /app/src/out
RUN  dotnet publish -c Release -o /app/src/out

# Once we have a publish version of the application, we don't need to use the DOTNET SDK ANYMORE
# we can get a build runtime image which is a smaller dotnet run time.
FROM mcr.microsoft.com/dotnet/aspnet:7.0

# set current working directory to app
WORKDIR /app
# copy all property files from build to /app/src/out from our current directory (represented by the .)
COPY --from=build /app/src/out .
# specify the entry point for our application
ENTRYPOINT [ "dotnet", "GatewayService.dll" ]

