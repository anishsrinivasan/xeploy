import { Redis } from "@upstash/redis";

const redis = new Redis({
  token: process.env.UPSTASH_TOKEN!,
  url: process.env.UPSTASH_URL!,
});

export const getCache = async <T>(
  key: string
): Promise<{ data: T | null; cached: "MISS" | "HIT" }> => {
  const data = await redis.get<T>(key);

  if (data) {
    return { cached: "HIT", data };
  }

  return { cached: "MISS", data: null };
};

export const setCache = async <T>(key: string, payload: T, ex: number = 60) => {
  const data = JSON.stringify(payload);
  redis.set(key, data, { ex });
  return;
};
