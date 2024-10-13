import {ApiEndpoint} from "@/contexts/env";
import * as v from "valibot";

const VUser = v.object({
  code: v.union([v.literal("401"),v.literal("200")]),
  status: v.union([v.literal("success"),v.literal("fail")]),
  message: v.optional(v.string()),
})

export const getUser = async () => {
  const request = await fetch(`${ApiEndpoint}/auth`, {
    method: "GET",
    credentials: "include",
  });
  const rawResponse = await request.json();
  return v.parse(VUser, rawResponse);
}