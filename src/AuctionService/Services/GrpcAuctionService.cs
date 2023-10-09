using AucationService.Data;
using AuctionService;
using Grpc.Core;

namespace AucationService.Service;

public class GrpcAuctionService : GrpcAuction.GrpcAuctionBase
{
    private readonly AuctionDbContext _dbContext;

    public GrpcAuctionService(AuctionDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public override async Task<GrpcAuctionResponse> GetAuction(GetAuctionRequest request, ServerCallContext context)
    {
        Console.WriteLine("==> We've receive the GRPC request for auction.");

        var auction = await _dbContext.Auctions.FindAsync(Guid.Parse(request.Id)) ?? throw new RpcException(new Status(StatusCode.NotFound, "Not Found"));

        var response = new GrpcAuctionResponse 
        {
            Auction = new GrpcAuctionModel
            {
                Auctionend = auction.AuctionEnd.ToString(),
                Id = auction.Id.ToString(),
                ReservePrice = auction.ReservePrice,
                Seller = auction.Seller
            }
        };
        return response;
    }
}