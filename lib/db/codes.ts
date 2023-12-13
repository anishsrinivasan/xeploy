export const DB_ERROR_CODES = {
  DUPLICATE_CONSTRAINT: "23505",
} as const;

export type DB_ERROR_CODES =
  (typeof DB_ERROR_CODES)[keyof typeof DB_ERROR_CODES];
