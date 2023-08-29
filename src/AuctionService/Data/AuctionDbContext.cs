using AuctionService.Entities;
using MassTransit;
using Microsoft.EntityFrameworkCore;

namespace AucationService.Data;

public class AucationDbContext : DbContext
{
    public AucationDbContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Auction> Auctions { get; set;}
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);;
        modelBuilder.AddInboxStateEntity();
        modelBuilder.AddOutboxMessageEntity();
        modelBuilder.AddOutboxStateEntity();
    }
}