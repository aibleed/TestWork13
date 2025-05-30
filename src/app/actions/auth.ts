"use server";
import { ApiError, baseApi } from "api";
import { dummyJSONApi } from "api/dummyJSON/dummyJSONApi";
import { FormState } from "app/auth/login/components/LoginForm/LoginForm";
import { cookies } from "next/headers";

export async function login(state: FormState, formData: FormData) {
  const name = formData.get("username") as string;
  const password = formData.get("password") as string;

  //TODO: Server-side validation

  try {
    const apiResponse = await dummyJSONApi.login(name, password);
    const cookieStore = await cookies();

    baseApi.token = apiResponse.accessToken;

    cookieStore.set("accessToken", apiResponse.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60,
      sameSite: "strict",
    });

    cookieStore.set("refreshToken", apiResponse.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "strict",
    });

    return {
      success: true,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      const err = error.toJSON();
      return {
        success: false,
        message:
          err.details?.message ??
          err.message ??
          "Service Unavailable - The server is temporarily unavailable",
      };
    }

    return {
      success: false,
      message: "An unknown error occurred",
    };
  }
}

export async function logout() {
  const cookieStore = await cookies();

  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");

  return {
    success: true,
    message: "Logout successful",
  };
}

export async function refresh() {
  const cookieStore = await cookies();

  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    return null;
  }

  try {
    const apiResponse = await dummyJSONApi.refresh(refreshToken);
    baseApi.token = apiResponse.accessToken;
    return apiResponse.accessToken;
  } catch (error) {
    console.error(error);
    return null;
  }
}
