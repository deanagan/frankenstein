namespace MassTransitDemo.Contracts;

public record SubmitOrder
{
    public SubmitOrder(Guid orderId, string productName, int quantity)
    {
        OrderId = orderId;
        ProductName = productName;
        Quantity = quantity;
    }

    public Guid OrderId { get; init; }
    public string ProductName { get; init; } = string.Empty;
    public int Quantity { get; init; }
}