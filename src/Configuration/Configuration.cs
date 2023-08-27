namespace DataConfiguration

public static class Configuration
{
    public static WebApplication.Services ConfigureServices(this WebApplicationBuilder.Services services, IConfiguration configuration)
    {
        services.AddDbContext<AuctionDbContext>(opt => {
            opt.UseNpgsql(configuration.GetConnectionString("DefaultConnection"));
        })
    }
}