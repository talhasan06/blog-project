const handleZodError = (err) => {
    const errorDetails = err.errors.map((error) => {
        return {
            path: error?.path[error.path.length - 1],
            message: error?.message,
        };
    });
    return {
        statusCode: 400,
        status: "error",
        message: "Validation Error",
        errorDetails,
    };
};
export default handleZodError;
