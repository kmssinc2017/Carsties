using AutoMapper;
using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Consumer;

public class AuctionCreatedConsumer : IConsumer<AuctionCreated>
{
    private readonly IMapper _mapper;

    public AuctionCreatedConsumer(IMapper mapper)
    {
        _mapper = mapper;
    }

    public async Task Consume(ConsumeContext<AuctionCreated> context)
    {
        Console.WriteLine("--> Comsuming auction created." + context.Message.Id);
        var item = _mapper.Map<Item>(context.Message);
        // example on how to perform additional opration.
       // if(item.Model == "Foo") throw new ArgumentException("Cannot sell cars with name foo.");
        await item.SaveAsync();
    }
}