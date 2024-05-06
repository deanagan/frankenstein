using SeedCollection.Models;

namespace SeedCollection.Interfaces
{
    public interface IProductService
    {
        ICollection<Product> GetProducts();
        Product? GetProduct(Guid uniqueId);
    }
}