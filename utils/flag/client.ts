export const getFlag = async (
  key: string,
  defaultFallback: boolean = false
): Promise<boolean> => {
  try {
    const res = await fetch(`https://flagsafe-slarity.vercel.app/api/ping`);
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
