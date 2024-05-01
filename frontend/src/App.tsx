// src/App.tsx
import React from "react";
import ProductCard from "./components/ProductCard";
import products from "./products";


// type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
const video_address =
  "https://github.com/deanagan/seed-collection/raw/main/frontend/public/videos/sample_video.mp4";

function VideoWithMultipleLinks() {
  // TODO: Move out to CSS files. Just for testing now.
  return (
    <div style={{ position: "relative", display: "flex" }}>
      <a
        href="https://www.theseedcollection.com.au/Garden-&-Flower-Scissors"
        style={{
          position: "absolute",
          top: "70%",
          left: "20%",
          zIndex: 10,
          display: "inline-block",
          width: "20px",
          height: "20px",
          backgroundColor: "red",
          borderRadius: "50%",
        }}
        title="Garden & Flower Scissors (RYSET)"
      ></a>
      <a
        href="https://www.theseedcollection.com.au/microgreen-seeds-kale-red-russian-p"
        style={{
          position: "absolute",
          top: "80%",
          left: "90%",
          zIndex: 10,
          display: "inline-block",
          width: "20px",
          height: "20px",
          backgroundColor: "green",
          borderRadius: "50%",
        }}
        title="Microgreen Seeds- Kale Red Russian"
      ></a>

      <video
        width={900}
        height="50%"
        controls
        style={{
          display: "flex",
          alignItems: "stretch",
          justifyContent: "center",
          width: "100%",
        }}
        autoPlay
        muted
        loop
      >
        <source src={video_address} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

function App() {
  // const [value, setValue] = useState<string>("");
  // const dispatch = useDispatch();

  // const [localStorageName, setLocalStorageName] = useLocalStorageState(
  //   "name",
  //   "No Name"
  // );

  // // Function to handle input change
  // const handleChange = (event: InputChangeEvent) => {
  //   setValue(event.target.value);
  //   setLocalStorageName(event.target.value);
  // };

  return (
    <div>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">
          Welcome to the Seed Collection!
        </h1>
        <h2>
          At the Seed Collection, we bring you a unique and immersive shopping
          experience like never before. Explore our curated collection of
          products showcased in captivating videos, where every frame is an
          opportunity to discover something extraordinary.
        </h2>
        <VideoWithMultipleLinks />
        <div className="sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* <div>
        <label htmlFor="name-text">Name: {localStorageName}</label>
        <input id="name-text" type="text" onChange={handleChange} />

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => dispatch(setName(value))}
        >
          Set Name
        </button>
      </div> */}
    </div>
  );
}

export default App;
