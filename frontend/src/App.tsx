// src/App.tsx
import React, { useState } from "react";
import ProductCard from "./components/ProductCard";
import products from "./products";

import { setName } from "./appActions"
import { useDispatch } from "react-redux";
import { useLocalStorageState } from "./hooks/localStorage";

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;


function App() {
  const [value, setValue] = useState<string>('');
  const dispatch = useDispatch();

  const [localStorageName, setLocalStorageName] = useLocalStorageState("name", "No Name");

  // Function to handle input change
  const handleChange = (event: InputChangeEvent) => {
    setValue(event.target.value);
    setLocalStorageName(event.target.value);
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
        <label htmlFor="name-text">Name: {localStorageName}</label>
        <input id="name-text" type="text" onChange={handleChange}/>
     
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() =>  dispatch(setName(value))}>
          Set Name
        </button>
      </div>
    </div>
  );
}

export default App;
