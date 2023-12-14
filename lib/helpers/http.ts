import { FEATURE_API_ENDPOINT } from "@/constants";

export const createcURL = (apiToken: string) => {
  return `curl "${FEATURE_API_ENDPOINT}" \ -H "Authorization: Bearer ${apiToken}"`;
};
