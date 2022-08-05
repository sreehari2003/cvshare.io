export const serverResponse = (message: string, data: unknown) => ({
  ok: true,
  message,
  data,
});
