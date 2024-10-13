import {ApiEndpoint} from "@/contexts/env";
import * as v from "valibot";

const VLoginResponse = v.object({
  code: v.union([v.literal("401"),v.literal("200")]),
  status: v.union([v.literal("success"),v.literal("fail")]),
  message: v.optional(v.string()),
});

export const postLogin = async (username: string, password: string) => {
  const request = await fetch(`${ApiEndpoint}/auth`,{
    method: "POST",
    body: JSON.stringify({username, password}),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
  const rawResponse = await request.json();
  const response = v.parse(VLoginResponse,rawResponse);
  if (response.status === "fail") {
    throw new Error(response.message);
  }
  return response;
}
