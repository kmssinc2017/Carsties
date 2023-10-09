using AuctionService;
using Grpc.Net.Client;
using Microsoft.IdentityModel.Tokens;

namespace BiddingService.Services;

public class GrpcAuctionClient
{
    private readonly ILogger<GrpcAuctionClient> _logger;
    private readonly IConfiguration _config;

    public GrpcAuctionClient(ILogger<GrpcAuctionClient> logger, IConfiguration config)
    {
        _logger = logger;
        _config = config;
    }

    public async Task<Auction> GetAuctions(string id)
    {
        _logger.LogInformation("===> calling Grpc Service from the client");

        var channel = GrpcChannel.ForAddress(_config["GrpcAuction"]);
        var client = new GrpcAuction.GrpcAuctionClient(channel);
        var request = new GetAuctionRequest { Id = id};

        try {
             
             var reply = await client.GetAuctionAsync(request);
             var auction = new Auction
             {
                ID = reply.Auction.Id,
                AuctionEnd = DateTime.Parse(reply.Auction.Auctionend),
                Seller = reply.Auction.Seller,
                ReservePrice = reply.Auction.ReservePrice
             };
             return auction;
        } catch (Exception ex)
        {
            _logger.LogError(ex, "Could not call Grpc Server.");
            return null;
        }
    }
}