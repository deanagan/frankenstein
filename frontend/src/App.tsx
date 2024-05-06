// src/App.tsx

import React, { Reducer, useRef, useEffect, useReducer, useState } from "react";
import ProductCard from "./components/ProductCard";
import "./App.css";
import { Product } from "./models/Product";
import * as Api from "./api";
import { AxiosResponse } from "axios";
import { dummyProducts } from "./dummyProducts";
import { CostCard } from "./components/CostCard";

// import { useMemoObjCompare } from "./hooks/memoObjCompare";
import { Action } from "redux";
import { useDispatch } from "react-redux";
import { useLocalStorageState } from "./hooks/localStorage";
import { setName } from "./appActions";

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
const video_address =
  "https://github.com/deanagan/seed-collection/raw/main/frontend/public/videos/sample_video.mp4";

interface VideoWithMultipleLinksProps {
  showLinkFn: VoidFunction;
}

const VideoWithMultipleLinks: React.FC<VideoWithMultipleLinksProps> = ({
  showLinkFn,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showRedLinks, setShowRedLinks] = useState<boolean>(false);
  const [showGreenLinks, setShowGreenLinks] = useState<boolean>(false);

  useEffect(() => {
    const handleTimeUpdate = (event: Event) => {
      const currentTime = (event.target as HTMLVideoElement).currentTime;

      // Time is in seconds. We want to call action at 5
      if (currentTime >= 5) {
        showLinkFn();
        setShowGreenLinks(true);
      }

      // Time is in seconds. We want to call action at 5
      if (currentTime >= 12) {
        showLinkFn();
        setShowRedLinks(true);
      }
    };
    const currentVideoRef = videoRef.current;
    if (currentVideoRef) {
      currentVideoRef.addEventListener("timeupdate", handleTimeUpdate);
    }

    return () => {
      if (currentVideoRef) {
        currentVideoRef.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [showLinkFn]);

  return (
    <div className="video-multi-link">
      {showRedLinks ? (
        <a
          className="hover-link hover-link-red"
          href="https://www.theseedcollection.com.au/Garden-&-Flower-Scissors"
          title="Click to Buy - Garden & Flower Scissors (RYSET)"
        ></a>
      ) : null}
      {showGreenLinks ? (
        <a
          className="hover-link hover-link-green"
          href="https://www.theseedcollection.com.au/microgreen-seeds-kale-red-russian-p"
          title="Click to buy - Microgreen Seeds- Kale Red Russian"
        ></a>
      ) : null}

      <video
        ref={videoRef}
        width="920"
        height="240"
        controls
        autoPlay
        muted
        loop
      >
        <source src={video_address} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

interface Profile {
  name: string;
  age: number;
  address: string;
}

interface ActionType {
  type: string;
  profile: Partial<Profile>;
}
function App() {
  const [value, setValue] = useState<string>("");
  const dispatch = useDispatch();

  const [localStorageName, setLocalStorageName] = useLocalStorageState(
    "name",
    "No Name"
  );

  // Function to handle input change
  const handleChange = (event: InputChangeEvent) => {
    setValue(event.target.value);
    setLocalStorageName(event.target.value);
  };
  const [products, setProducts] = useState<Product[]>([]);
  const topProduct = products[0];
  const [profileState, setProfileState] = useReducer<
    Reducer<Partial<Profile>, ActionType>
  >(
    (state: Partial<Profile>, action: ActionType) => {
      switch (action.type) {
        case "SET_AGE":
          return { ...state, age: action.profile.age };
        case "SET_NAME":
          return { ...state, name: action.profile.name };
        case "SET_ADDRESS":
          return { ...state, name: action.profile.address };

        default:
          return state;
      }
    },
    { name: "", age: 0, address: "" }
  );

  useEffect(() => {
    Api.getProducts()
      .then((response: AxiosResponse<Product[]>) => {
        const productsRetrieved: Product[] = response.data;
        setProducts(productsRetrieved);
        console.log(productsRetrieved);
        const newValue: ActionType = {
          type: "SET_NAME",
          profile: { name: "Josh" },
        };
        setProfileState(newValue);
      })
      .catch(() => {
        // No backend, let's call dummy for now
        setProducts(dummyProducts);
        const newValue: ActionType = {
          type: "SET_NAME",
          profile: { name: "Josh" },
        };
        setProfileState(newValue);
      });
  }, []);

  return (
    <div>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">
          Welcome to the Seed Collection, {profileState.name} {profileState.age}
          !
        </h1>
        <h2>
          At the Seed Collection, we bring you a unique and immersive shopping
          experience like never before. Explore our curated collection of
          products showcased in captivating videos, where every frame is an
          opportunity to discover something extraordinary.
        </h2>
        <VideoWithMultipleLinks
          showLinkFn={() => console.log("Showing link function now")}
        />
        <div className="sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {topProduct ? (
        <React.Fragment>
          <CostCard pickedFields={topProduct} />
          {/* <CostCard price={topProduct.price} name={topProduct.name} /> */}
        </React.Fragment>
      ) : null}

      <div>
        <label htmlFor="name-text">Name: {localStorageName}</label>
        <input id="name-text" type="text" onChange={handleChange} />

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => dispatch(setName(value))}
        >
          Set Name
        </button>
      </div>
    </div>
  );
}

export default App;
