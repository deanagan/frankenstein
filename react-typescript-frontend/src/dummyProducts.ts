import { Product } from "./models/Product";

// Dummy database for now
export const dummyProducts: Product[] = [
  {
    id: "1",
    name: "Broccoli",
    price: 2.99,
    description: "Fresh broccoli from the local farm.",
    image:
      "https://github.com/deanagan/seed-collection/blob/main/frontend/public/images/product-image-1.jpg?raw=true",
  },
  {
    id: "2",
    name: "Kale",
    price: 1.99,
    description: "Organic kale, packed with nutrients.",
    image:
      "https://github.com/deanagan/seed-collection/blob/main/frontend/public/images/product-image-2.jpg?raw=true",
  },
  {
    id: "3",
    name: "Nasturtium",
    price: 3.49,
    description: "Edible flowers with a peppery flavor.",
    image:
      "https://github.com/deanagan/seed-collection/blob/main/frontend/public/images/product-image-3.jpg?raw=true",
  },
];
