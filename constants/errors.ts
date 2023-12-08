export const ERROR_MESSAGES = {
  INTERNAL_ERROR: "Oops, Something went wrong! Please contact the Admin!",
};

export type ERROR_MESSAGES = (typeof ERROR_MESSAGES)[keyof typeof ERROR_MESSAGES];
