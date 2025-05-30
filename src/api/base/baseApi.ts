import axios, { AxiosResponse, AxiosError } from "axios";

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly code?: string,
    public readonly details?: { message?: string },
    public readonly originalError?: AxiosError,
  ) {
    super(getErrorMessage(status, code, details));
    this.name = "ApiError";

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }

  isServerError(): boolean {
    return this.status >= 500 && this.status < 600;
  }

  isClientError(): boolean {
    return this.status >= 400 && this.status < 500;
  }

  toJSON() {
    return {
      status: this.status,
      code: this.code,
      details: this.details,
      message: this.message,
      name: this.name,
    };
  }
}

function getErrorMessage(
  status: number,
  code?: string,
  details?: { message?: string },
): string {
  const defaultMessages: Record<number, string> = {
    400: "Bad Request - The server cannot process the request",
    500: "Internal Server Error - Something went wrong on our end",
    502: "Bad Gateway - The server received an invalid response",
    503: "Service Unavailable - The server is temporarily unavailable",
    504: "Gateway Timeout - The server didn't respond in time",
  };

  if (details?.message) {
    return details.message;
  }

  if (code) {
    return `${defaultMessages[status] || "An error occurred"} (${code})`;
  }

  return defaultMessages[status] || `HTTP Error ${status}`;
}

export class BaseApi {
  private _controller = axios.create({
    headers: {
      "Content-Type": "application/json",
    },
  });

  get controller() {
    return this._controller;
  }

  set token(accessToken: string) {
    this._controller.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  }

  withApiError = async <R>(req: Promise<AxiosResponse<R>>): Promise<R> => {
    try {
      const res = await req;
      return res.data;
    } catch (e) {
      if (!(e instanceof AxiosError)) {
        throw new ApiError(0, "UNKNOWN_ERROR", {
          message: "An unknown error occurred",
        });
      }

      if (!e.response) {
        throw new ApiError(
          0,
          "NETWORK_ERROR",
          { message: "Network error - please check your connection" },
          e,
        );
      }

      const { status, data } = e.response;

      if (status === 401) {
        this.cleanupAuth();
      }

      const errorDetails = typeof data === "object" ? data : { raw: data };
      const errorCode = data?.code || e.code || `HTTP_${status}`;

      throw new ApiError(status, errorCode, errorDetails, e);
    }
  };

  private cleanupAuth() {
    this._controller.defaults.headers.common.Authorization = "";
  }
}

export const baseApi = new BaseApi();
