export const MOCK_PROJECT_ID = process.env.MOCK_PROJECT_ID!;
export const MOCK_ENVIRONMENT_ID = process.env.MOCK_ENVIRONMENT_ID!;
export const MOCK_USER_ID = process.env.MOCK_USER_ID!;
export const API_TOKEN_SECRET = process.env.API_TOKEN_SECRET!;
export const PUBLIC_URL =
  process.env.NEXT_PUBLIC_PUBLIC_URL! || "https://xeploy.com";
export const NEXT_PUBLIC_API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN!;

export const DEFAULT_ENV_NAME = "Development";
export const API_CACHE_KEY = "x-cache";
export const FEATURE_API_ENDPOINT = `${PUBLIC_URL}/api/v1/features`;
export const DEMO_USER_EMAIL = process.env.DEMO_USER_EMAIL!;
export const DEMO_USER_PASSWORD = process.env.DEMO_USER_PASSWORD!;
