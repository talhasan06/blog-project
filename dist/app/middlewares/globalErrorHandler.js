import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError.js";
import handleValidationError from "../errors/handleValidationError.js";
import handleCastError from "../errors/handleCastError.js";
import ApiError from "../errors/ApiError.js";
import config from "../config/index.js";
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = "Something went wrong!";
    let errorDetails = [];
    if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorDetails = simplifiedError.errorDetails;
    }
    else if (err?.name === "ValidationError") {
        const simplifiedError = handleValidationError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorDetails = simplifiedError.errorDetails;
    }
    else if (err?.name === "CastError") {
        const simplifiedError = handleCastError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorDetails = simplifiedError.errorDetails;
    }
    else if (err instanceof ApiError) {
        statusCode = err?.statusCode;
        message = err?.message;
        errorDetails = [{ path: "", message: err?.message }];
    }
    else if (err instanceof Error) {
        message = err?.message;
        errorDetails = [{ path: "", message: err?.message }];
    }
    res.status(statusCode).json({
        success: false,
        message,
        error: errorDetails,
        stack: config.node_env === "development" ? err?.stack : undefined,
    });
};
export default globalErrorHandler;
