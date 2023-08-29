using Contracts;
using MassTransit;
using MongoDB.Entities;
using Polly;
using SearchService.Models;

namespace SearchService.Consumer;

public class AuctoinDeletedConsumer : IConsumer<AuctionDeleted>
{
    public async Task Consume(ConsumeContext<AuctionDeleted> context)
    {
        Console.WriteLine(" --> Consume auction deleted =" + context.Message.Id);
        var result = await DB.DeleteAsync<Item>(context.Message.Id);
        if(!result.IsAcknowledged)
        throw new MessageException(typeof(AuctionDeleted), "Problem deleting auction.");
    }
}