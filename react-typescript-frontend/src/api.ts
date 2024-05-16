import axios, { AxiosResponse } from "axios";
import { Product } from "./models/Product";

type ProductsResponsePromise = Promise<AxiosResponse<Product[]>>;
const baseUrl = "http://localhost:3002/api";

export function getProducts(): ProductsResponsePromise {
  return axios.get<Product[]>(`${baseUrl}/products`);
}
