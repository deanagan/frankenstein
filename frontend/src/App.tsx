// src/App.tsx
import React from "react";
import ProductCard from "./components/ProductCard";
import products from "./products";

function App() {
  return (
    <div className="dark:bg-dark">
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Shootin Cards Inventory</h1>
        <div className="sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
