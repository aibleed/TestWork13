import { withQueryParams } from "api/utils";
import { DUMMY_JSON_API_URL } from "./dummyJSONApi.type";

const ROOT = DUMMY_JSON_API_URL;


export const login = () => `${ROOT}/auth/login`;
export const refresh = () => `${ROOT}/auth/refresh`;
export const getUser = () => `${ROOT}/auth/me`;
export const getProducts = () => withQueryParams(`${ROOT}/products`, { limit: 12 });
