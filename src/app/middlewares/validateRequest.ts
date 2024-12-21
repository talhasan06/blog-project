import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import catchAsync from "../utils/catchAsync.js";

const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
      // if everything all right next() ->
      await schema.parseAsync({
        body: req.body,
      });
      next();
    } catch (err) {
      next(err);
    }
  });
};

export default validateRequest;
