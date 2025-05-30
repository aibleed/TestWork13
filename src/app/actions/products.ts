import { dummyJSONApi } from "api/dummyJSON/dummyJSONApi";

export const fetchProducts = async () => {
  try {
    const apiResponse = await dummyJSONApi.getProducts();
    return apiResponse.products;
  } catch (err) {
    console.error(err);
    return [];
  }
};
