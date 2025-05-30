import { baseApi } from "../base/baseApi";
import * as DummyJSONType from "./dummyJSONApi.type";
import * as DummyJSONEndpoint from "./dummyJSONEndpoint";

class DummyJSONApi {
  private base = baseApi;

  refresh = async (refreshToken: string) => {
    return this.base.withApiError(
      this.base.controller.post<DummyJSONType.RefreshResponse>(
        DummyJSONEndpoint.refresh(),
        {
          refreshToken,
        },
      ),
    );
  };

  login = async (username: string, password: string) => {
    return this.base.withApiError(
      this.base.controller.post<DummyJSONType.LoginResponse>(
        DummyJSONEndpoint.login(),
        { username, password },
      ),
    );
  };

  getAuthUser = async (accessToken: string) => {
    this.base.token = accessToken;
    return this.base.withApiError(
      this.base.controller.get<DummyJSONType.User>(DummyJSONEndpoint.getUser()),
    );
  };

  getProducts = async () => {
    return this.base.withApiError(
      this.base.controller.get<DummyJSONType.ProductsResponse>(
        DummyJSONEndpoint.getProducts(),
      ),
    );
  };
}
export const dummyJSONApi = new DummyJSONApi();
