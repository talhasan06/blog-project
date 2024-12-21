import mongoose from "mongoose";

const handleValidationError = (err: mongoose.Error.ValidationError) => {
  const errorDetails = Object.values(err.errors).map((error) => ({
    path: error.path,
    message: error.message,
  }));

  return {
    statusCode: 400,
    status: "error",
    message: "Validation Error",
    errorDetails,
  };
};

export default handleValidationError;
