export const ErrorSchema = {
  type: "object",
  required: ["errors"],
  properties: {
    errors: {
      type: "array",
      items: {
        type: "object",
        properties: {
          message: {
            type: "string",
          },
          field: {
            type: "string",
          },
        },
        required: ["message"],
      },
    },
  },
};

export type ErrorResponseType = {
  errors: Array<{
    message: string;
    field?: string;
  }>;
};
