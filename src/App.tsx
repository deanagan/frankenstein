// src/App.tsx
import React from "react";
import ProductCard from "./components/ProductCard";
import products from "./products";

function App() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Your E-commerce Store</h1>
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default App;
