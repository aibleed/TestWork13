export const DUMMY_JSON_API_URL = "https://dummyjson.com";

export type User = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
};

export type LoginResponse = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
};

export type ProductsResponse = {
  limit: number;
  products: Product[];
  skip: number;
  total: number;
};

export type RefreshResponse = {
  accessToken: string;
  refreshToken: string;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  thumbnail: string;
};

export type Products = Product[];
