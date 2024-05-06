using System;

namespace SeedCollection.Models
{
    public class Product
    {
        public Guid UniqueId { get; set; }
        public required string Name { get; set; }
        public decimal Price { get; set; }
    }
}