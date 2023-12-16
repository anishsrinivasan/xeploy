import { FEATURE_API_ENDPOINT, NEXT_PUBLIC_API_TOKEN } from "@/constants";

export const getFlag = async (
  key: string,
  defaultFallback: boolean = false
): Promise<boolean> => {
  try {
    const res = await fetch(`${FEATURE_API_ENDPOINT}`, {
      headers: {
        authorization: `Bearer ${NEXT_PUBLIC_API_TOKEN}`,
      },
    });
    if (!res.ok) {
      throw new Error("Request Failed");
    }

    const response = await res.json();
    const features = response.features || [];

    const feature = features.find((x: any) => x.name === key);

    if (feature) {
      return feature.enabled;
    }
  } catch (err) {
    console.error("getFlagRequestFailed", err);
    return defaultFallback;
  }

  return defaultFallback;
};
