using SeedCollection.Models;
using SeedCollection.Interfaces;

namespace SeedCollection.Services
{

    public class ProductService : IProductService
    {
        private readonly List<Product> _products = new List<Product>
        {
            new Product { UniqueId = new Guid("7203b321-b874-423a-a018-7ef493830575"), Name = "Product 1", Price = 10.99m },
            new Product { UniqueId = new Guid("b530400d-3fde-4b20-be53-09e01bc82358"), Name = "Product 2", Price = 20.49m },
            new Product { UniqueId = new Guid("1f18bf14-debc-4477-a8bc-490e87764705"), Name = "Product 3", Price = 15.99m }
        };

        public Product? GetProduct(Guid uniqueId)
        {
            return _products.FirstOrDefault(product => product.UniqueId == uniqueId);
        }

        public ICollection<Product> GetProducts()
        {
            return _products;
        }
    }
}
