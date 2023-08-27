using Microsoft.AspNetCore.Mvc;
using MongoDB.Entities;
using SearchService.Models;
using SearchService.RequestHelpers;

namespace SearchService.Controller;

[ApiController]
[Route("api/search")]
public class SearchController : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<Item>>> SearchItem([FromQuery]SearchParams searchTerm)
    {
        var query = DB.PagedSearch<Item, Item>();
        query.Sort(x => x.Ascending(a => a.Make));

        if(!string.IsNullOrEmpty(searchTerm.searchTerm))
        {
            query.Match(Search.Full, searchTerm.searchTerm).SortByTextScore();
        }

        query = searchTerm.OrderBy switch
        {
            "make" => query.Sort(x => x.Ascending(y => y.Make)),
            "new" => query.Sort(x => x.Descending(y => y.CreatedAt)),
            _ => query.Sort(x => x.Ascending(y => y.AuctionEnd))
        };

        query = searchTerm.FilterBy switch
        {
            "finished" => query.Match(x => x.AuctionEnd < DateTime.UtcNow),
            "endingSoon" => query.Match(x => x.AuctionEnd < DateTime.UtcNow.AddHours(6) &&  x.AuctionEnd > DateTime.UtcNow),
            _ => query.Match(x => x.AuctionEnd > DateTime.UtcNow)
        };

        if(!string.IsNullOrEmpty(searchTerm.Seller))
        {
            query.Match(x => x.Seller == searchTerm.Seller);
        }

         if(!string.IsNullOrEmpty(searchTerm.Winner))
        {
            query.Match(x => x.Winner == searchTerm.Winner);
        }

        query.PageNumber(searchTerm.PageNumber);
        query.PageSize(searchTerm.PageSize);

        var result = await query.ExecuteAsync();
        return Ok(new 
        {
            result = result.Results,
            pageCount = result.PageCount,
            totalCount = result.TotalCount
        });
    }   
}