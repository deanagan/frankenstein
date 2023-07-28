// src/App.tsx
import React from "react";
import ProductCard from "./components/ProductCard";
import products from "./products";

function App() {
  return (
    <div className="dark:bg-dark">
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Shootin Cards Inventory</h1>
        <div className="grid grid-cols-6 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
