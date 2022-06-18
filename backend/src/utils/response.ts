export const serverResponse = (message: string, data: unknown) => {
  return {
    ok: true,
    message,
    data,
  };
};
