// src/App.tsx
import React, { useState } from "react";
import ProductCard from "./components/ProductCard";
import products from "./products";

import { setName } from "./appActions"
import { useDispatch } from "react-redux";

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;


function App() {
  const [value, setValue] = useState<string>('');
  const dispatch = useDispatch();

  // Function to handle input change
  const handleChange = (event: InputChangeEvent) => {
    setValue(event.target.value);
    
  }

  return (
    <div >
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Seed Collection Inventory</h1>
        <div className="sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <div>
        <input type="text" onChange={handleChange}/>
     
        <button onClick={() =>  dispatch(setName(value))}>
          Set Name
        </button>
      </div>
    </div>
  );
}

export default App;