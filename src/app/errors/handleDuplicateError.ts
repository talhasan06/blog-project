import { Error } from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../interface/error.js";

const handleDuplicateError = (
  err: Error & { code?: number }
): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);

  const extractedMessage = match && match[1];

  const errorSources: TErrorSources = [
    {
      path: "",
      message: `${extractedMessage} is already exists`,
    },
  ];

  return {
    statusCode: 400,
    message: "Invalid ID",
    errorSources,
  };
};

export default handleDuplicateError;
