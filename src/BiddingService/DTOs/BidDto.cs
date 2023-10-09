namespace BiddingService.DTOs;
public class BidDto
{
    public int Id { get; set; }
    public string AuctionId { get; set; }   

    public string Bidder { get; set; }

    public DateTime BidTime { get; set; }

    public int Amount { get; set; } 

    public string BidStatus { get; set; }
}