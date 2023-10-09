

using Contracts;
using MassTransit;
using MongoDB.Entities;

namespace BiddingService.Services;


// Derive from background server. This is the base class for implementing a long running IHosted service.
//It will run as a singleton service. It start when our application start and stop when the application shotdown.
// Since the background service is singleton and the masstransit service is a scoped service, we can't inject masstransit here because it has a different lifetime.
// We'll have to create a scope to get IPublishedEndpoint for mass transit.
public class CheckAuctionFinished : BackgroundService 
{
    private readonly ILogger<CheckAuctionFinished> _logger;
    private readonly IServiceProvider _services;

    public CheckAuctionFinished(ILogger<CheckAuctionFinished> logger, IServiceProvider services)
    {
        _logger = logger;
        _services = services;
    }
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("Starting check for finished auctions.");

        stoppingToken.Register(() => _logger.LogInformation("====> Auction Check is stopping"));

        while(!stoppingToken.IsCancellationRequested)
        {
            await CheckAuctions(stoppingToken);
            await Task.Delay(5000, stoppingToken);
        }
    }

    private async Task CheckAuctions(CancellationToken stoppingToken)
    {
       var finishedAuctions = await DB.Find<Auction>()
            .Match(x => x.AuctionEnd <= DateTime.UtcNow)
            .Match(x => !x.Finished)
            .ExecuteAsync(stoppingToken);

            if(finishedAuctions.Count == 0) return;

            _logger.LogInformation($"===> found ${finishedAuctions.Count}");

            using var scope = _services.CreateScope();
            var endpoint = scope.ServiceProvider.GetRequiredService<IPublishEndpoint>();
            foreach(var auction in finishedAuctions)
            {
                auction.Finished = true;
                await auction.SaveAsync(null, stoppingToken);

                var winningBid = await DB.Find<Bid>()
                    .Match(a => a.AuctionId == auction.ID)
                    .Match(b => b.BidStatus == BidStatus.Accepted)
                    .Sort(x => x.Descending(s => s.Amount))
                    .ExecuteFirstAsync();

                await endpoint.Publish(new AuctionFinished
                {
                    ItemSold = winningBid != null,
                    AucationId  = auction.ID,
                    Winner = winningBid?.Bidder,
                    Amount = winningBid?.Amount,
                    Seller = auction.Seller
                }, stoppingToken);
            }
    }
}