import "server-only";

import { cookies } from "next/headers";
import { dummyJSONApi } from "api/dummyJSON/dummyJSONApi";
import { cache } from "react";

export const verifySession = cache(async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  if (!accessToken) return null;

  try {
    const session = await dummyJSONApi.getAuthUser(accessToken);

    if (!session.id) {
      return null;
    }

    return { isAuth: true, user: session };
  } catch (error) {
    console.error(error);
    return null;
  }
});
