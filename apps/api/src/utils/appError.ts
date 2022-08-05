class AppError extends Error {
  statusCode: number;

  status: string;

  isOperationol: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperationol = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
export default AppError;
