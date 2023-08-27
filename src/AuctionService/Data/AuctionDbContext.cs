using AuctionService.Entities;
using Microsoft.EntityFrameworkCore;

namespace AucationService.Data;

public class AucationDbContext : DbContext
{
    public AucationDbContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Auction> Auctions { get; set;}
}