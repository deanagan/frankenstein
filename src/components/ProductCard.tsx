import React from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-dark p-4 shadow-md">
      <img src={product.image} alt={product.name} className="object-cover" />
      <h2 className="text-xl font-semibold mt-2 dark:text-blue-500">
        {product.name}
      </h2>
      <p className="dark:text-white">{product.description}</p>
      {/* <p className="text-green-600 mt-2">${product.price}</p> */}
      {/* <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        Add to Cart
      </button> */}
    </div>
  );
};

export default ProductCard;
