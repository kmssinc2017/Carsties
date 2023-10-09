#1 Bidding Service introduction

    The bidding service implements a long running background job. This job will run every 5 seconds to see if there finished auctions.
    Derive from background server. This is the base class for implementing a long running IHosted service.
    It will run as a singleton service. It start when our application start and stop when the application shotdown.
    Since the background service is singleton and the masstransit service is a scoped service, we can't inject masstransit here because it has a different lifetime.
    We'll have to create a scope to get IPublishedEndpoint for mass transit.
        1.  This long running background service which is called CheckAuctionFinished needs to be register inside Program.cs file as a AddHostedService.

#1.1 Configuration
We've created the Grpc server on the Auction Service project. In this case, the AuctionService project is seem as the server.
In order to consume this service in the BiddingService project, we need to install the following packages from nuget

1.  Google.Protobuf - It's a long time library for protocol buffers
2.  grpc.tools - It's a gRPC and Protocol Buffer compiler for C# projects
3.  Grpc.Net.Client - It's a .Net client for gRPC.

#2. Inside the biddingService, we need to create a protos folder. Inside of the pprotos foler, we create an auctions.proto (it must be named auctions.proto) file.

1. Once the auctions.proto file is added, we need to modify the csproj file to add an itemgroup for the client.

   <ItemGroup>
       <Protobuf Include="protos/auctions.proto" GrpcServices="Client" />
   </ItemGroup>
   (note: a similar file was added to the auction service, but in the case of auction service, it referred to the GrpcServices as the Server and not client.)

2. Run dotnet build and verify that a file folder called protos is created within the project under .../obj/debug/protos and has two files
   1. auctions.cs and auctionsGrpc.cs
3. In the Program.cs file, we need to register the GrpcAuctionClient as a scoped server.
