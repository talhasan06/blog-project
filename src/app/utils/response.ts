import { Response } from "express";

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data?: T;
};

type TErrorResponse = {
  success: boolean;
  message: string;
  statusCode: number;
  error: unknown;
  stack?: string;
};

export const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    statusCode: data.statusCode,
    data: data.data,
  });
};

export const errorResponse = (res: Response, data: TErrorResponse) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    statusCode: data.statusCode,
    error: data.error,
    stack: data.stack,
  });
};
